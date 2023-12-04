import * as Ajv from 'ajv';
import { Request } from 'express';
import { ValidationError } from '../framework/types';
export declare class ContentType {
    readonly contentType: string;
    readonly mediaType: string;
    readonly charSet: string;
    readonly withoutBoundary: string;
    readonly isWildCard: boolean;
    private constructor();
    static from(req: Request): ContentType;
    static fromString(type: string): ContentType;
    equivalents(): string[];
}
/**
 * (side-effecting) modifies the errors object
 * TODO - do this some other way
 * @param errors
 */
export declare function augmentAjvErrors(errors?: Ajv.ErrorObject[]): Ajv.ErrorObject[];
export declare function ajvErrorsToValidatorError(status: number, errors: Ajv.ErrorObject[]): ValidationError;
export declare const deprecationWarning: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
/**
 *
 * @param accepts the list of accepted media types
 * @param expectedTypes - expected media types defined in the response schema
 * @returns the content-type
 */
export declare const findResponseContent: (accepts: string[], expectedTypes: string[]) => string;
