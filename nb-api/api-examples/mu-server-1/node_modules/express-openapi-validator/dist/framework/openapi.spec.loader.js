"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenApiSpecLoader = exports.sortRoutes = void 0;
const index_1 = require("./index");
// Sort routes by most specific to least specific i.e. static routes before dynamic
// e.g. /users/my_route before /users/{id}
// Exported for tests
exports.sortRoutes = (r1, r2) => {
    const e1 = r1.expressRoute.replace(/\/:/g, '/~');
    const e2 = r2.expressRoute.replace(/\/:/g, '/~');
    return e1 > e2 ? 1 : -1;
};
class OpenApiSpecLoader {
    constructor(opts) {
        this.framework = new index_1.OpenAPIFramework(opts);
    }
    async load() {
        return this.discoverRoutes();
    }
    loadSync() {
        const discoverRoutesSync = () => {
            let savedError, savedResult, done = false;
            const discoverRoutes = require('util').callbackify(this.discoverRoutes.bind(this));
            // const discoverRoutes: any = this.discoverRoutes.bind(this);
            discoverRoutes((error, result) => {
                savedError = error;
                savedResult = result;
                done = true;
            });
            // Deasync should be used here any nowhere else!
            // it is an optional peer dep
            // Only necessary for those looking to use a blocking
            // intial openapi parse to resolve json-schema-refs
            require('deasync').loopWhile(() => !done);
            if (savedError)
                throw savedError;
            return savedResult;
        };
        return discoverRoutesSync();
    }
    async discoverRoutes() {
        const routes = [];
        const toExpressParams = this.toExpressParams;
        // const basePaths = this.framework.basePaths;
        // let apiDoc: OpenAPIV3.Document = null;
        // let basePaths: string[] = null;
        const { apiDoc, basePaths } = await this.framework.initialize({
            visitApi(ctx) {
                var _a, _b;
                const apiDoc = ctx.getApiDoc();
                const basePaths = ctx.basePaths;
                for (const bpa of basePaths) {
                    const bp = bpa.replace(/\/$/, '');
                    for (const [path, methods] of Object.entries(apiDoc.paths)) {
                        for (const [method, schema] of Object.entries(methods)) {
                            if (method.startsWith('x-') || ['parameters', 'summary', 'description'].includes(method)) {
                                continue;
                            }
                            const schemaParameters = new Set();
                            ((_a = schema.parameters) !== null && _a !== void 0 ? _a : []).forEach(parameter => schemaParameters.add(parameter));
                            ((_b = methods.parameters) !== null && _b !== void 0 ? _b : []).forEach(parameter => schemaParameters.add(parameter));
                            schema.parameters = Array.from(schemaParameters);
                            const pathParams = new Set();
                            for (const param of schema.parameters) {
                                if (param.in === 'path') {
                                    pathParams.add(param.name);
                                }
                            }
                            const openApiRoute = `${bp}${path}`;
                            const expressRoute = `${openApiRoute}`
                                .split('/')
                                .map(toExpressParams)
                                .join('/');
                            routes.push({
                                expressRoute,
                                openApiRoute,
                                method: method.toUpperCase(),
                                pathParams: Array.from(pathParams),
                                schema,
                            });
                        }
                    }
                }
            },
        });
        routes.sort(exports.sortRoutes);
        return {
            apiDoc,
            basePaths,
            routes,
        };
    }
    toExpressParams(part) {
        return part.replace(/\{([^}]+)}/g, ':$1');
    }
}
exports.OpenApiSpecLoader = OpenApiSpecLoader;
//# sourceMappingURL=openapi.spec.loader.js.map