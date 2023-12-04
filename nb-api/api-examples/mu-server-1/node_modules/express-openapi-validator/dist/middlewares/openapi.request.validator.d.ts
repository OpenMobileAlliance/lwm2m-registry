import { NextFunction, Response } from 'express';
import { OpenAPIV3, OpenApiRequest, RequestValidatorOptions } from '../framework/types';
export declare class RequestValidator {
    private middlewareCache;
    private apiDoc;
    private ajv;
    private requestOpts;
    constructor(apiDoc: OpenAPIV3.Document, options?: RequestValidatorOptions);
    validate(req: OpenApiRequest, res: Response, next: NextFunction): void;
    private buildMiddleware;
    private processQueryParam;
}
