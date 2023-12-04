"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodySchemaParser = void 0;
const types_1 = require("../../framework/types");
class BodySchemaParser {
    constructor(ajv, apiDoc) {
        this.ajv = ajv;
        this._apiDoc = apiDoc;
    }
    parse(path, pathSchema, contentType) {
        // TODO should return OpenAPIV3.SchemaObject instead
        let schemaRequestBody = pathSchema.requestBody;
        if (schemaRequestBody === null || schemaRequestBody === void 0 ? void 0 : schemaRequestBody.hasOwnProperty('$ref')) {
            // TODO use ajv.getSchema instead
            const ref = schemaRequestBody.$ref;
            const id = ref.replace(/^.+\//i, '');
            schemaRequestBody = this._apiDoc.components.requestBodies[id];
        }
        const requestBody = schemaRequestBody;
        if (requestBody === null || requestBody === void 0 ? void 0 : requestBody.hasOwnProperty('content')) {
            return this.toSchema(path, contentType, requestBody);
            // if (requestBody.required) required.push('body');
        }
        return {};
    }
    toSchema(path, contentType, requestBody) {
        var _a;
        if (requestBody.content) {
            let content = null;
            for (const type of contentType.equivalents()) {
                content = requestBody.content[type];
                if (content)
                    break;
            }
            if (!content) {
                for (const requestContentType of Object.keys(requestBody.content)
                    .sort()
                    .reverse()) {
                    if (requestContentType === '*/*') {
                        content = requestBody.content[requestContentType];
                        break;
                    }
                    if (!new RegExp(/^[a-z]+\/\*$/).test(requestContentType))
                        continue; // not a wildcard of type application/*
                    const [type] = requestContentType.split('/', 1);
                    if (new RegExp(`^${type}\/.+$`).test(contentType.contentType)) {
                        content = requestBody.content[requestContentType];
                        break;
                    }
                }
            }
            if (!content) {
                const msg = contentType.contentType === 'not_provided'
                    ? 'media type not specified'
                    : `unsupported media type ${contentType.contentType}`;
                throw new types_1.UnsupportedMediaType({ path: path, message: msg });
            }
            const schema = this.cleanseContentSchema(content);
            return (_a = schema !== null && schema !== void 0 ? schema : content.schema) !== null && _a !== void 0 ? _a : {};
        }
        return {};
    }
    cleanseContentSchema(content) {
        let contentRefSchema = null;
        if (content.schema && '$ref' in content.schema) {
            const resolved = this.ajv.getSchema(content.schema.$ref);
            const schema = resolved === null || resolved === void 0 ? void 0 : resolved.schema;
            contentRefSchema = (schema === null || schema === void 0 ? void 0 : schema.properties) ? Object.assign({}, schema) : null;
        }
        // handle readonly / required request body refs
        // don't need to copy schema if validator gets its own copy of the api spec
        // currently all middleware i.e. req and res validators share the spec
        const schema = contentRefSchema || content.schema;
        if (schema && schema.properties) {
            Object.keys(schema.properties).forEach((prop) => {
                const propertyValue = schema.properties[prop];
                const required = schema.required;
                if (propertyValue.readOnly && required) {
                    const index = required.indexOf(prop);
                    if (index > -1) {
                        schema.required = required
                            .slice(0, index)
                            .concat(required.slice(index + 1));
                    }
                }
            });
            return schema;
        }
    }
}
exports.BodySchemaParser = BodySchemaParser;
//# sourceMappingURL=body.parse.js.map