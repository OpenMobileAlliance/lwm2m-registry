"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.security = void 0;
const types_1 = require("../framework/types");
const defaultSecurityHandler = (req, scopes, schema) => true;
function security(context, securityHandlers) {
    return async (req, res, next) => {
        var _a, _b, _c;
        // TODO move the folllowing 3 check conditions to a dedicated upstream middleware
        if (!req.openapi) {
            // this path was not found in open api and
            // this path is not defined under an openapi base path
            // skip it
            return next();
        }
        const openapi = req.openapi;
        const expressRoute = openapi.expressRoute;
        if (!expressRoute) {
            return next(new types_1.NotFound({
                path: req.path,
                message: 'not found',
            }));
        }
        const pathSchema = openapi.schema;
        if (!pathSchema) {
            // add openapi metadata to make this case more clear
            // its not obvious that missig schema means methodNotAllowed
            return next(new types_1.MethodNotAllowed({
                path: req.path,
                message: `${req.method} method not allowed`,
            }));
        }
        // use the local security object or fallbac to api doc's security or undefined
        const securities = (_a = openapi.schema.security) !== null && _a !== void 0 ? _a : context.apiDoc.security;
        const path = openapi.openApiRoute;
        if (!path || !Array.isArray(securities) || securities.length === 0) {
            return next();
        }
        const securitySchemes = (_b = context.apiDoc.components) === null || _b === void 0 ? void 0 : _b.securitySchemes;
        if (!securitySchemes) {
            const message = `security referenced at path ${path}, but not defined in 'components.securitySchemes'`;
            return next(new types_1.InternalServerError({ path: path, message: message }));
        }
        try {
            const results = await new SecuritySchemes(securitySchemes, securityHandlers, securities).executeHandlers(req);
            // TODO handle AND'd and OR'd security
            // This assumes OR only! i.e. at least one security passed authentication
            let firstError = null;
            let success = false;
            for (const r of results) {
                if (r.success) {
                    success = true;
                    break;
                }
                else if (!firstError) {
                    firstError = r;
                }
            }
            if (success) {
                next();
            }
            else {
                throw firstError;
            }
        }
        catch (e) {
            const message = ((_c = e === null || e === void 0 ? void 0 : e.error) === null || _c === void 0 ? void 0 : _c.message) || 'unauthorized';
            const err = types_1.HttpError.create({
                status: e.status,
                path: path,
                message: message,
            });
            /*const err =
              e.status == 500
                ? new InternalServerError({ path: path, message: message })
                : e.status == 403
                ? new Forbidden({ path: path, message: message })
                : new Unauthorized({ path: path, message: message });*/
            next(err);
        }
    };
}
exports.security = security;
class SecuritySchemes {
    constructor(securitySchemes, securityHandlers, securities) {
        this.securitySchemes = securitySchemes;
        this.securityHandlers = securityHandlers;
        this.securities = securities;
    }
    async executeHandlers(req) {
        // use a fallback handler if security handlers is not specified
        // This means if security handlers is specified, the user must define
        // all security handlers
        const fallbackHandler = !this.securityHandlers
            ? defaultSecurityHandler
            : null;
        const promises = this.securities.map(async (s) => {
            var _a, _b, _c;
            try {
                if (Util.isEmptyObject(s)) {
                    // anonumous security
                    return { success: true };
                }
                const securityKey = Object.keys(s)[0];
                const scheme = this.securitySchemes[securityKey];
                const handler = (_b = (_a = this.securityHandlers) === null || _a === void 0 ? void 0 : _a[securityKey]) !== null && _b !== void 0 ? _b : fallbackHandler;
                const scopesTmp = s[securityKey];
                const scopes = Array.isArray(scopesTmp) ? scopesTmp : [];
                if (!scheme) {
                    const message = `components.securitySchemes.${securityKey} does not exist`;
                    throw new types_1.InternalServerError({ message });
                }
                if (!scheme.hasOwnProperty('type')) {
                    const message = `components.securitySchemes.${securityKey} must have property 'type'`;
                    throw new types_1.InternalServerError({ message });
                }
                if (!handler) {
                    const message = `a security handler for '${securityKey}' does not exist`;
                    throw new types_1.InternalServerError({ message });
                }
                new AuthValidator(req, scheme, scopes).validate();
                // expected handler results are:
                // - throw exception,
                // - return true,
                // - return Promise<true>,
                // - return false,
                // - return Promise<false>
                // everything else should be treated as false
                const securityScheme = scheme;
                const success = await handler(req, scopes, securityScheme);
                if (success === true) {
                    return { success };
                }
                else {
                    throw Error();
                }
            }
            catch (e) {
                return {
                    success: false,
                    status: (_c = e.status) !== null && _c !== void 0 ? _c : 401,
                    error: e,
                };
            }
        });
        return Promise.all(promises);
    }
}
class AuthValidator {
    constructor(req, scheme, scopes = []) {
        const openapi = req.openapi;
        this.req = req;
        this.scheme = scheme;
        this.path = openapi.openApiRoute;
        this.scopes = scopes;
    }
    validate() {
        this.validateApiKey();
        this.validateHttp();
        this.validateOauth2();
        this.validateOpenID();
    }
    validateOauth2() {
        const { req, scheme, path } = this;
        if (['oauth2'].includes(scheme.type.toLowerCase())) {
            // TODO oauth2 validation
        }
    }
    validateOpenID() {
        const { req, scheme, path } = this;
        if (['openIdConnect'].includes(scheme.type.toLowerCase())) {
            // TODO openidconnect validation
        }
    }
    validateHttp() {
        const { req, scheme, path } = this;
        if (['http'].includes(scheme.type.toLowerCase())) {
            const authHeader = req.headers['authorization'] &&
                req.headers['authorization'].toLowerCase();
            if (!authHeader) {
                throw Error(`Authorization header required`);
            }
            const type = scheme.scheme && scheme.scheme.toLowerCase();
            if (type === 'bearer' && !authHeader.includes('bearer')) {
                throw Error(`Authorization header with scheme 'Bearer' required`);
            }
            if (type === 'basic' && !authHeader.includes('basic')) {
                throw Error(`Authorization header with scheme 'Basic' required`);
            }
            this.dissallowScopes();
        }
    }
    validateApiKey() {
        const { req, scheme, path } = this;
        if (scheme.type === 'apiKey') {
            if (scheme.in === 'header') {
                if (!req.headers[scheme.name.toLowerCase()]) {
                    throw Error(`'${scheme.name}' header required`);
                }
            }
            else if (scheme.in === 'query') {
                if (!req.query[scheme.name]) {
                    throw Error(`query parameter '${scheme.name}' required`);
                }
            }
            else if (scheme.in === 'cookie') {
                if (!req.cookies[scheme.name]) {
                    throw Error(`cookie '${scheme.name}' required`);
                }
            }
            this.dissallowScopes();
        }
    }
    dissallowScopes() {
        if (this.scopes.length > 0) {
            // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#security-requirement-object
            throw new types_1.InternalServerError({
                message: "scopes array must be empty for security type 'http'",
            });
        }
    }
}
class Util {
    static isEmptyObject(o) {
        return (typeof o === 'object' &&
            Object.entries(o).length === 0 &&
            o.constructor === Object);
    }
}
//# sourceMappingURL=openapi.security.js.map