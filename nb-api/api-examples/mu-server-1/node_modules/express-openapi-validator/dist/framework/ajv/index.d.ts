import * as Ajv from 'ajv';
import { OpenAPIV3 } from '../types';
import ajv = require('ajv');
export declare function createRequestAjv(openApiSpec: OpenAPIV3.Document, options?: ajv.Options): Ajv.Ajv;
export declare function createResponseAjv(openApiSpec: OpenAPIV3.Document, options?: ajv.Options): Ajv.Ajv;
