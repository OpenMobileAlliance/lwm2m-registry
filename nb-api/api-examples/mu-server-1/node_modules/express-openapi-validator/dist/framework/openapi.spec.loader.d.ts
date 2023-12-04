import { OpenAPIV3, OpenAPIFrameworkArgs } from './types';
export interface Spec {
    apiDoc: OpenAPIV3.Document;
    basePaths: string[];
    routes: RouteMetadata[];
}
export interface RouteMetadata {
    expressRoute: string;
    openApiRoute: string;
    method: string;
    pathParams: string[];
    schema: OpenAPIV3.OperationObject;
}
export declare const sortRoutes: (r1: any, r2: any) => 1 | -1;
export declare class OpenApiSpecLoader {
    private readonly framework;
    constructor(opts: OpenAPIFrameworkArgs);
    load(): Promise<Spec>;
    loadSync(): Spec;
    private discoverRoutes;
    private toExpressParams;
}
