import { ErrorLike } from "./types";
/**
 * Does a one-time determination of whether this JavaScript engine
 * supports lazy `Error.stack` properties.
 */
export declare const supportsLazyStack: boolean;
/**
 * Does this error have a lazy stack property?
 */
export declare function hasLazyStack(error: ErrorLike): boolean;
/**
 * Appends the original `Error.stack` property to the new Error's stack.
 */
export declare function joinStacks(newError: ErrorLike, originalError?: ErrorLike): string | undefined;
/**
 * Calls `joinStacks` lazily, when the `Error.stack` property is accessed.
 */
export declare function lazyJoinStacks(newError: ErrorLike, originalError?: ErrorLike): void;
