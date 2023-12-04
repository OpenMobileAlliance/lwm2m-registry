import { RequestHandler } from 'express';
import * as ajv from 'ajv';
import { OpenAPIV3, OpenApiRequest } from '../framework/types';
interface ValidateResult {
    validators: {
        [key: string]: ajv.ValidateFunction;
    };
    body: object;
    statusCode: number;
    path: string;
    accepts: string[];
}
export declare class ResponseValidator {
    private ajv;
    private spec;
    private validatorsCache;
    constructor(openApiSpec: OpenAPIV3.Document, options?: ajv.Options);
    validate(): RequestHandler;
    _getOrBuildValidator(req: OpenApiRequest, responses: OpenAPIV3.ResponsesObject): {
        [key: string]: ajv.ValidateFunction;
    };
    _validate({ validators, body, statusCode, path, accepts, }: ValidateResult): void;
    /**
     * Build a map of response name to response validator, for the set of responses
     * defined on the current endpoint
     * @param responses
     * @returns a map of validators
     */
    private buildValidators;
    /**
     * Checks if specific Content-Type is validatable
     * @param contentType
     * @returns boolean
     * @throws error on invalid content type format
     */
    private canValidateContentType;
}
export {};
