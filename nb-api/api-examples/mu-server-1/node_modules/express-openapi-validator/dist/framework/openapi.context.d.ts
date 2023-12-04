import { OpenAPIV3 } from './types';
import { Spec, RouteMetadata } from './openapi.spec.loader';
export interface RoutePair {
    expressRoute: string;
    openApiRoute: string;
}
export declare class OpenApiContext {
    readonly apiDoc: OpenAPIV3.Document;
    readonly expressRouteMap: {};
    readonly openApiRouteMap: {};
    readonly routes: RouteMetadata[];
    private readonly basePaths;
    private readonly ignorePaths;
    constructor(spec: Spec, ignorePaths: RegExp);
    isManagedRoute(path: string): boolean;
    shouldIgnoreRoute(path: string): boolean;
    routePair(route: string): RoutePair;
    private methods;
    private buildRouteMaps;
}
