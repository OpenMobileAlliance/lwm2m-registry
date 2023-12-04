"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAPISchemaValidator = void 0;
const Ajv = require("ajv");
const merge = require("lodash.merge");
const draftSchema = require("ajv/lib/refs/json-schema-draft-04.json");
// https://github.com/OAI/OpenAPI-Specification/blob/master/schemas/v3.0/schema.json
const openapi3Schema = require("./openapi.v3.schema.json");
class OpenAPISchemaValidator {
    constructor({ version, extensions, }) {
        const v = new Ajv({ schemaId: 'auto', allErrors: true });
        v.addMetaSchema(draftSchema);
        const ver = version && parseInt(String(version), 10);
        if (!ver)
            throw Error('version missing from OpenAPI specification');
        if (ver != 3)
            throw Error('OpenAPI v3 specification version is required');
        const schema = merge({}, openapi3Schema, extensions !== null && extensions !== void 0 ? extensions : {});
        v.addSchema(schema);
        this.validator = v.compile(schema);
    }
    validate(openapiDoc) {
        const valid = this.validator(openapiDoc);
        if (!valid) {
            return { errors: this.validator.errors };
        }
        else {
            return { errors: [] };
        }
    }
}
exports.OpenAPISchemaValidator = OpenAPISchemaValidator;
//# sourceMappingURL=openapi.schema.validator.js.map