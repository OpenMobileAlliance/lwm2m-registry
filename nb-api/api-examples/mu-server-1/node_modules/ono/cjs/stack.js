"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newline = /\r?\n/;
const onoCall = /\bono\b/;
/**
 * Does a one-time determination of whether this JavaScript engine
 * supports lazy `Error.stack` properties.
 */
exports.supportsLazyStack = Boolean(
// ES5 property descriptors must be supported
Object.getOwnPropertyDescriptor && Object.defineProperty &&
    // Chrome on Android doesn't support lazy stacks :(
    (typeof navigator === "undefined" || !/Android/.test(navigator.userAgent)));
/**
 * Does this error have a lazy stack property?
 */
function hasLazyStack(error) {
    if (!exports.supportsLazyStack) {
        return false;
    }
    let descriptor = Object.getOwnPropertyDescriptor(error, "stack");
    if (!descriptor) {
        return false;
    }
    return typeof descriptor.get === "function";
}
exports.hasLazyStack = hasLazyStack;
/**
 * Appends the original `Error.stack` property to the new Error's stack.
 */
function joinStacks(newError, originalError) {
    let newStack = popStack(newError.stack);
    let originalStack = originalError ? originalError.stack : undefined;
    if (newStack && originalStack) {
        return newStack + "\n\n" + originalStack;
    }
    else {
        return newStack || originalStack;
    }
}
exports.joinStacks = joinStacks;
/**
 * Calls `joinStacks` lazily, when the `Error.stack` property is accessed.
 */
function lazyJoinStacks(newError, originalError) {
    let descriptor = Object.getOwnPropertyDescriptor(newError, "stack");
    if (originalError && descriptor && typeof descriptor.get === "function") {
        Object.defineProperty(newError, "stack", {
            get: () => {
                let newStack = descriptor.get.apply(newError);
                return joinStacks({ stack: newStack }, originalError);
            },
            enumerable: false,
            configurable: true
        });
    }
    else {
        lazyPopStack(newError);
    }
}
exports.lazyJoinStacks = lazyJoinStacks;
/**
 * Removes Ono from the stack, so that the stack starts at the original error location
 */
function popStack(stack) {
    if (stack === undefined) {
        return undefined;
    }
    let lines = stack.split(newline);
    if (lines.length < 2) {
        // The stack only has one line, so there's nothing we can remove
        return stack;
    }
    // Find the `ono` call in the stack, and remove it
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (onoCall.test(line)) {
            lines.splice(i, 1);
            return lines.join("\n");
        }
    }
    // If we get here, then the stack doesn't contain a call to `ono`.
    // This may be due to minification or some optimization of the JS engine.
    // So just return the stack as-is.
    return stack;
}
/**
 * Calls `popStack` lazily, when the `Error.stack` property is accessed.
 */
function lazyPopStack(error) {
    let descriptor = Object.getOwnPropertyDescriptor(error, "stack");
    if (descriptor && typeof descriptor.get === "function") {
        Object.defineProperty(error, "stack", {
            get: () => popStack(descriptor.get.apply(error)),
            enumerable: false,
            configurable: true
        });
    }
}
//# sourceMappingURL=stack.js.map