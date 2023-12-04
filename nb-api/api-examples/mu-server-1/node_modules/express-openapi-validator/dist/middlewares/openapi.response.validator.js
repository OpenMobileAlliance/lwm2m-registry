"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseValidator = void 0;
const modded_express_mung_1 = require("../framework/modded.express.mung");
const ajv_1 = require("../framework/ajv");
const util_1 = require("./util");
const types_1 = require("../framework/types");
const mediaTypeParser = require("media-typer");
const contentTypeParser = require("content-type");
class ResponseValidator {
    constructor(openApiSpec, options = {}) {
        this.validatorsCache = {};
        this.spec = openApiSpec;
        this.ajv = ajv_1.createResponseAjv(openApiSpec, options);
        modded_express_mung_1.default.onError = (err, req, res, next) => {
            return next(err);
        };
    }
    validate() {
        return modded_express_mung_1.default.json((body, req, res) => {
            var _a;
            if (req.openapi) {
                const openapi = req.openapi;
                const responses = (_a = openapi.schema) === null || _a === void 0 ? void 0 : _a.responses;
                const validators = this._getOrBuildValidator(req, responses);
                const path = req.originalUrl;
                const statusCode = res.statusCode;
                const contentType = res.getHeaders()['content-type'];
                const accept = req.headers['accept'];
                // ir response has a content type use it, else use accept headers
                const accepts = contentType
                    ? [contentType]
                    : accept
                        ? accept.split(',').map((h) => h.trim())
                        : [];
                return this._validate({
                    validators,
                    body,
                    statusCode,
                    path,
                    accepts,
                });
            }
            return body;
        });
    }
    // TODO public for test only - fix me
    // Build validators for each url/method/contenttype tuple
    _getOrBuildValidator(req, responses) {
        var _a, _b;
        // get the request content type - used only to build the cache key
        const contentTypeMeta = util_1.ContentType.from(req);
        const contentType = (_b = (((_a = contentTypeMeta.contentType) === null || _a === void 0 ? void 0 : _a.indexOf('multipart')) > -1
            ? contentTypeMeta.equivalents()[0]
            : contentTypeMeta.contentType)) !== null && _b !== void 0 ? _b : 'not_provided';
        const openapi = req.openapi;
        const key = `${req.method}-${openapi.expressRoute}-${contentType}`;
        let validators = this.validatorsCache[key];
        if (!validators) {
            validators = this.buildValidators(responses);
            this.validatorsCache[key] = validators;
        }
        return validators;
    }
    // TODO public for test only - fix me
    _validate({ validators, body, statusCode, path, accepts, }) {
        const status = statusCode !== null && statusCode !== void 0 ? statusCode : 'default';
        const statusXX = status.toString()[0] + 'XX';
        let svalidator;
        if (status in validators) {
            svalidator = validators[status];
        }
        else if (statusXX in validators) {
            svalidator = validators[statusXX];
        }
        else if (validators.default) {
            svalidator = validators.default;
        }
        else {
            throw new types_1.InternalServerError({
                path: path,
                message: `no schema defined for status code '${status}' in the openapi spec`,
            });
        }
        const validatorContentTypes = Object.keys(svalidator);
        const contentType = util_1.findResponseContent(accepts, validatorContentTypes) ||
            validatorContentTypes[0]; // take first contentType, if none found
        if (!contentType) {
            // not contentType inferred, assume valid
            console.warn('no contentType found');
            return;
        }
        const validator = svalidator[contentType];
        if (!validator) {
            // no validator found, assume valid
            console.warn('no validator found');
            return;
        }
        if (!body) {
            throw new types_1.InternalServerError({
                path: '.response',
                message: 'response body required.',
            });
        }
        // CHECK If Content-Type is validatable
        try {
            if (!this.canValidateContentType(contentType)) {
                console.warn('Cannot validate content type', contentType);
                // assume valid
                return;
            }
        }
        catch (e) {
            // Do nothing. Move on and validate response
        }
        const valid = validator({
            response: body,
        });
        if (!valid) {
            const errors = util_1.augmentAjvErrors(validator.errors);
            const message = this.ajv.errorsText(errors, {
                dataVar: '',
            });
            throw new types_1.InternalServerError({
                path: path,
                errors: util_1.ajvErrorsToValidatorError(500, errors).errors,
                message: message,
            });
        }
    }
    /**
     * Build a map of response name to response validator, for the set of responses
     * defined on the current endpoint
     * @param responses
     * @returns a map of validators
     */
    buildValidators(responses) {
        var _a, _b, _c;
        const validationTypes = (response) => {
            if (!response.content) {
                return ['no_content'];
            }
            if (typeof response.content !== 'object') {
                return [];
            }
            const types = [];
            for (let contentType of Object.keys(response.content)) {
                try {
                    if (this.canValidateContentType(contentType)) {
                        if (response.content[contentType] &&
                            response.content[contentType].schema) {
                            types.push(contentType);
                        }
                    }
                }
                catch (e) {
                    // Handle wildcards
                    if (response.content[contentType].schema &&
                        (contentType === '*/*' ||
                            new RegExp(/^[a-z]+\/\*$/).test(contentType))) {
                        types.push(contentType);
                    }
                }
            }
            return types;
        };
        const responseSchemas = {};
        for (const [name, resp] of Object.entries(responses)) {
            let tmpResponse = resp;
            if (tmpResponse.$ref) {
                // resolve top level response $ref
                const id = tmpResponse.$ref.replace(/^.+\//i, '');
                tmpResponse = (_b = (_a = this.spec.components) === null || _a === void 0 ? void 0 : _a.responses) === null || _b === void 0 ? void 0 : _b[id];
            }
            const response = tmpResponse;
            const types = validationTypes(response);
            for (const mediaTypeToValidate of types) {
                if (!mediaTypeToValidate) {
                    // TODO support content other than JSON
                    // don't validate
                    // assume is valid
                    continue;
                }
                else if (mediaTypeToValidate === 'no_content') {
                    responseSchemas[name] = {};
                    continue;
                }
                const schema = response.content[mediaTypeToValidate].schema;
                responseSchemas[name] = Object.assign(Object.assign({}, responseSchemas[name]), { [mediaTypeToValidate]: {
                        // $schema: 'http://json-schema.org/schema#',
                        // $schema: "http://json-schema.org/draft-04/schema#",
                        type: 'object',
                        properties: {
                            response: schema,
                        },
                        components: (_c = this.spec.components) !== null && _c !== void 0 ? _c : {},
                    } });
            }
        }
        const validators = {};
        for (const [code, contentTypeSchemas] of Object.entries(responseSchemas)) {
            for (const contentType of Object.keys(contentTypeSchemas)) {
                const schema = contentTypeSchemas[contentType];
                schema.paths = this.spec.paths; // add paths for resolution with multi-file
                schema.components = this.spec.components; // add components for resolution w/ multi-file
                validators[code] = Object.assign(Object.assign({}, validators[code]), { [contentType]: this.ajv.compile(schema) });
            }
        }
        return validators;
    }
    /**
     * Checks if specific Content-Type is validatable
     * @param contentType
     * @returns boolean
     * @throws error on invalid content type format
     */
    canValidateContentType(contentType) {
        const contentTypeParsed = contentTypeParser.parse(contentType);
        const mediaTypeParsed = mediaTypeParser.parse(contentTypeParsed.type);
        return (mediaTypeParsed.subtype === 'json' || mediaTypeParsed.suffix === 'json');
    }
}
exports.ResponseValidator = ResponseValidator;
//# sourceMappingURL=openapi.response.validator.js.map