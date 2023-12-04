/// <reference types="qs" />
import { Application, Router } from 'express';
import { OpenApiValidatorOpts } from './framework/types';
export { InternalServerError, UnsupportedMediaType, RequestEntityToLarge, BadRequest, MethodNotAllowed, NotFound, Unauthorized, Forbidden, } from './framework/types';
export declare const resolvers: {
    defaultResolver(handlersPath: string, route: import("./framework/openapi.spec.loader").RouteMetadata, apiDoc: import("./framework/types").OpenAPIV3.Document): import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>;
    modulePathResolver(handlersPath: string, route: import("./framework/openapi.spec.loader").RouteMetadata, apiDoc: import("./framework/types").OpenAPIV3.Document): import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>;
};
export declare class OpenApiValidator {
    private readonly options;
    constructor(options: OpenApiValidatorOpts);
    installSync(app: Application | Router): void;
    install(app: Application | Router): Promise<void>;
    install(app: Application | Router, callback: (error: Error) => void): void;
    private installMiddleware;
    private installPathParams;
    private installMetadataMiddleware;
    private installMultipartMiddleware;
    private installSecurityMiddleware;
    private installRequestValidationMiddleware;
    private installResponseValidationMiddleware;
    private installOperationHandlers;
    private validateOptions;
    private normalizeOptions;
    private isOperationHandlerOptions;
}
