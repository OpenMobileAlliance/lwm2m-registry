import { SecurityHandlers, OpenApiRequestHandler } from '../framework/types';
import { OpenApiContext } from '../framework/openapi.context';
export declare function security(context: OpenApiContext, securityHandlers: SecurityHandlers): OpenApiRequestHandler;
