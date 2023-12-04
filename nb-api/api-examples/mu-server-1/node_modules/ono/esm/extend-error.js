import { addInspectMethod } from "./isomorphic.node";
import { hasLazyStack, joinStacks, lazyJoinStacks } from "./stack";
import { getDeepKeys, toJSON } from "./to-json";
const protectedProps = ["name", "message", "stack"];
/**
 * Extends the new error with the properties of the original error and the `props` object.
 *
 * @param newError - The error object to extend
 * @param originalError - The original error object, if any
 * @param props - Additional properties to add, if any
 */
export function extendError(newError, originalError, props) {
    extendStack(newError, originalError);
    // Copy properties from the original error
    if (originalError && typeof originalError === "object") {
        mergeErrors(newError, originalError);
    }
    // The default `toJSON` method doesn't output props like `name`, `message`, `stack`, etc.
    // So replace it with one that outputs every property of the error.
    newError.toJSON = toJSON;
    // On Node.js, add support for the `util.inspect()` method
    if (addInspectMethod) {
        addInspectMethod(newError);
    }
    // Finally, copy custom properties that were specified by the user.
    // These props OVERWRITE any previous props
    if (props && typeof props === "object") {
        Object.assign(newError, props);
    }
}
/**
 * Extend the error stack to include its cause
 */
function extendStack(newError, originalError) {
    if (hasLazyStack(newError)) {
        lazyJoinStacks(newError, originalError);
    }
    else {
        newError.stack = joinStacks(newError, originalError);
    }
}
/**
 * Merges properties of the original error with the new error.
 *
 * @param newError - The error object to extend
 * @param originalError - The original error object, if any
 */
function mergeErrors(newError, originalError) {
    // Get the original error's keys
    // NOTE: We specifically exclude properties that we have already set on the new error.
    // This is _especially_ important for the `stack` property, because this property has
    // a lazy getter in some environments
    let keys = getDeepKeys(originalError, protectedProps);
    // HACK: We have to cast the errors to `any` so we can use symbol indexers.
    // see https://github.com/Microsoft/TypeScript/issues/1863
    // tslint:disable: no-any no-unsafe-any
    let _newError = newError;
    let _originalError = originalError;
    for (let key of keys) {
        if (_newError[key] === undefined) {
            try {
                _newError[key] = _originalError[key];
            }
            catch (e) {
                // This property is read-only, so it can't be copied
            }
        }
    }
}
//# sourceMappingURL=extend-error.js.map