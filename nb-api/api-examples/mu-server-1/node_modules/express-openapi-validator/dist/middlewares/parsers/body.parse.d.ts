import { Ajv } from 'ajv';
import { ContentType } from '../util';
import { OpenAPIV3, BodySchema } from '../../framework/types';
export declare class BodySchemaParser {
    private _apiDoc;
    private ajv;
    constructor(ajv: Ajv, apiDoc: OpenAPIV3.Document);
    parse(path: string, pathSchema: OpenAPIV3.OperationObject, contentType: ContentType): BodySchema;
    private toSchema;
    private cleanseContentSchema;
}
