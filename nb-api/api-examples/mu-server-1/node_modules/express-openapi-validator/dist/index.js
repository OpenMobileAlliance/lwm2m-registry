"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenApiValidator = exports.resolvers = exports.Forbidden = exports.Unauthorized = exports.NotFound = exports.MethodNotAllowed = exports.BadRequest = exports.RequestEntityToLarge = exports.UnsupportedMediaType = exports.InternalServerError = void 0;
const ono_1 = require("ono");
const _uniq = require("lodash.uniq");
const middlewares = require("./middlewares");
const openapi_context_1 = require("./framework/openapi.context");
const openapi_spec_loader_1 = require("./framework/openapi.spec.loader");
const util_1 = require("./middlewares/util");
const resolvers_1 = require("./resolvers");
var types_1 = require("./framework/types");
Object.defineProperty(exports, "InternalServerError", { enumerable: true, get: function () { return types_1.InternalServerError; } });
Object.defineProperty(exports, "UnsupportedMediaType", { enumerable: true, get: function () { return types_1.UnsupportedMediaType; } });
Object.defineProperty(exports, "RequestEntityToLarge", { enumerable: true, get: function () { return types_1.RequestEntityToLarge; } });
Object.defineProperty(exports, "BadRequest", { enumerable: true, get: function () { return types_1.BadRequest; } });
Object.defineProperty(exports, "MethodNotAllowed", { enumerable: true, get: function () { return types_1.MethodNotAllowed; } });
Object.defineProperty(exports, "NotFound", { enumerable: true, get: function () { return types_1.NotFound; } });
Object.defineProperty(exports, "Unauthorized", { enumerable: true, get: function () { return types_1.Unauthorized; } });
Object.defineProperty(exports, "Forbidden", { enumerable: true, get: function () { return types_1.Forbidden; } });
const solvers = require("./resolvers");
exports.resolvers = Object.assign({}, solvers);
class OpenApiValidator {
    constructor(options) {
        this.validateOptions(options);
        this.normalizeOptions(options);
        if (options.unknownFormats == null)
            options.unknownFormats === true;
        if (options.coerceTypes == null)
            options.coerceTypes = true;
        if (options.validateRequests == null)
            options.validateRequests = true;
        if (options.validateResponses == null)
            options.validateResponses = false;
        if (options.validateSecurity == null)
            options.validateSecurity = true;
        if (options.fileUploader == null)
            options.fileUploader = {};
        if (options.$refParser == null)
            options.$refParser = { mode: 'bundle' };
        if (options.validateFormats == null)
            options.validateFormats = 'fast';
        if (typeof options.operationHandlers === 'string') {
            /**
             * Internally, we want to convert this to a value typed OperationHandlerOptions.
             * In this way, we can treat the value as such when we go to install (rather than
             * re-interpreting it over and over).
             */
            options.operationHandlers = {
                basePath: options.operationHandlers,
                resolver: resolvers_1.defaultResolver,
            };
        }
        else if (typeof options.operationHandlers !== 'object') {
            // This covers cases where operationHandlers is null, undefined or false.
            options.operationHandlers = false;
        }
        if (options.validateResponses === true) {
            options.validateResponses = {
                removeAdditional: false,
            };
        }
        if (options.validateRequests === true) {
            options.validateRequests = {
                allowUnknownQueryParameters: false,
            };
        }
        if (options.validateSecurity === true) {
            options.validateSecurity = {};
        }
        this.options = options;
    }
    installSync(app) {
        const spec = new openapi_spec_loader_1.OpenApiSpecLoader({
            apiDoc: this.options.apiSpec,
        }).loadSync();
        this.installMiddleware(app, spec);
    }
    install(app, callback) {
        const p = new openapi_spec_loader_1.OpenApiSpecLoader({
            apiDoc: this.options.apiSpec,
            $refParser: this.options.$refParser,
        })
            .load()
            .then((spec) => this.installMiddleware(app, spec));
        const useCallback = callback && typeof callback === 'function';
        if (useCallback) {
            p.catch((e) => {
                callback(e);
            });
        }
        else {
            return p;
        }
    }
    installMiddleware(app, spec) {
        const context = new openapi_context_1.OpenApiContext(spec, this.options.ignorePaths);
        this.installPathParams(app, context);
        this.installMetadataMiddleware(app, context);
        if (this.options.fileUploader) {
            this.installMultipartMiddleware(app, context);
        }
        const components = context.apiDoc.components;
        if (this.options.validateSecurity && (components === null || components === void 0 ? void 0 : components.securitySchemes)) {
            this.installSecurityMiddleware(app, context);
        }
        if (this.options.validateRequests) {
            this.installRequestValidationMiddleware(app, context);
        }
        if (this.options.validateResponses) {
            this.installResponseValidationMiddleware(app, context);
        }
        if (this.options.operationHandlers) {
            this.installOperationHandlers(app, context);
        }
    }
    installPathParams(app, context) {
        const pathParams = [];
        for (const route of context.routes) {
            if (route.pathParams.length > 0) {
                pathParams.push(...route.pathParams);
            }
        }
        // install param on routes with paths
        for (const p of _uniq(pathParams)) {
            app.param(p, (req, res, next, value, name) => {
                const openapi = req.openapi;
                if (openapi === null || openapi === void 0 ? void 0 : openapi.pathParams) {
                    const { pathParams } = openapi;
                    // override path params
                    req.params[name] = pathParams[name] || req.params[name];
                }
                next();
            });
        }
    }
    installMetadataMiddleware(app, context) {
        app.use(middlewares.applyOpenApiMetadata(context));
    }
    installMultipartMiddleware(app, context) {
        app.use(middlewares.multipart(context, {
            multerOpts: this.options.fileUploader,
            unknownFormats: this.options.unknownFormats,
        }));
    }
    installSecurityMiddleware(app, context) {
        var _a;
        const securityHandlers = (_a = (this.options.validateSecurity)) === null || _a === void 0 ? void 0 : _a.handlers;
        const securityMiddleware = middlewares.security(context, securityHandlers);
        app.use(securityMiddleware);
    }
    installRequestValidationMiddleware(app, context) {
        const { coerceTypes, unknownFormats, validateRequests, validateFormats, } = this.options;
        const { allowUnknownQueryParameters } = (validateRequests);
        const requestValidator = new middlewares.RequestValidator(context.apiDoc, {
            nullable: true,
            coerceTypes,
            removeAdditional: false,
            useDefaults: true,
            unknownFormats,
            allowUnknownQueryParameters,
            format: validateFormats,
        });
        const requestValidationHandler = (req, res, next) => requestValidator.validate(req, res, next);
        app.use(requestValidationHandler);
    }
    installResponseValidationMiddleware(app, context) {
        const { coerceTypes, unknownFormats, validateResponses, validateFormats, } = this.options;
        const { removeAdditional } = validateResponses;
        const responseValidator = new middlewares.ResponseValidator(context.apiDoc, {
            nullable: true,
            coerceTypes,
            removeAdditional,
            unknownFormats,
            format: validateFormats,
        });
        app.use(responseValidator.validate());
    }
    installOperationHandlers(app, context) {
        for (const route of context.routes) {
            const { method, expressRoute } = route;
            /**
             * This if-statement is here to "narrow" the type of options.operationHanlders
             * to OperationHandlerOptions (down from string | false | OperationHandlerOptions)
             * At this point of execution it _should_ be impossible for this to NOT be the correct
             * type as we re-assign during construction to verify this.
             */
            if (this.isOperationHandlerOptions(this.options.operationHandlers)) {
                const { basePath, resolver } = this.options.operationHandlers;
                app[method.toLowerCase()](expressRoute, resolver(basePath, route, context.apiDoc));
            }
        }
    }
    validateOptions(options) {
        if (!options.apiSpec)
            throw ono_1.default('apiSpec required');
        const securityHandlers = options.securityHandlers;
        if (securityHandlers != null) {
            if (typeof securityHandlers !== 'object' ||
                Array.isArray(securityHandlers)) {
                throw ono_1.default('securityHandlers must be an object or undefined');
            }
            util_1.deprecationWarning('securityHandlers is deprecated. Use validateSecurities.handlers instead.');
        }
        if (options.securityHandlers && options.validateSecurity) {
            throw ono_1.default('securityHandlers and validateSecurity may not be used together. Use validateSecurities.handlers to specify handlers.');
        }
        const multerOpts = options.multerOpts;
        if (multerOpts != null) {
            if (typeof multerOpts !== 'object' || Array.isArray(multerOpts)) {
                throw ono_1.default('multerOpts must be an object or undefined');
            }
            util_1.deprecationWarning('multerOpts is deprecated. Use fileUploader instead.');
        }
        if (options.multerOpts && options.fileUploader) {
            throw ono_1.default('multerOpts and fileUploader may not be used together. Use fileUploader to specify upload options.');
        }
        const unknownFormats = options.unknownFormats;
        if (typeof unknownFormats === 'boolean') {
            if (!unknownFormats) {
                throw ono_1.default("unknownFormats must contain an array of unknownFormats, 'ignore' or true");
            }
        }
        else if (typeof unknownFormats === 'string' &&
            unknownFormats !== 'ignore' &&
            !Array.isArray(unknownFormats))
            throw ono_1.default("unknownFormats must contain an array of unknownFormats, 'ignore' or true");
    }
    normalizeOptions(options) {
        // Modify the request
        if (options.securityHandlers) {
            options.validateSecurity = {
                handlers: options.securityHandlers,
            };
            delete options.securityHandlers;
        }
        if (options.multerOpts) {
            options.fileUploader = options.multerOpts;
            delete options.multerOpts;
        }
    }
    isOperationHandlerOptions(value) {
        if (value.resolver) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.OpenApiValidator = OpenApiValidator;
//# sourceMappingURL=index.js.map