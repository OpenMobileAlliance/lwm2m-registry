"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extend_error_1 = require("./extend-error");
const onoConstructor = Ono;
exports.Ono = onoConstructor;
const onoSingleton = Ono(Error);
exports.ono = onoSingleton;
/**
 * Creates an `Ono` instance for a specifc error type.
 */
function Ono(klass) {
    // tslint:disable-next-line: no-shadowed-variable
    return function ono(...args) {
        let originalError;
        let props;
        let formatArgs;
        let formattedMessage = "";
        // Determine which arguments were actually specified
        if (typeof args[0] === "string") {
            formatArgs = args;
        }
        else if (typeof args[1] === "string") {
            if (args[0] instanceof Error) {
                originalError = args[0];
            }
            else {
                props = args[0];
            }
            formatArgs = args.slice(1);
        }
        else {
            originalError = args[0];
            props = args[1];
            formatArgs = args.slice(2);
        }
        // If there are any format arguments, then format the error message
        if (formatArgs.length > 0) {
            formattedMessage = onoSingleton.formatter.apply(undefined, formatArgs);
        }
        if (originalError && originalError.message) {
            // The inner-error's message will be added to the new message
            formattedMessage += (formattedMessage ? " \n" : "") + originalError.message;
        }
        // @ts-ignore
        // Create the new error
        // NOTE: DON'T move this line to a separate function! We don't want to pollute the stack trace
        let newError = new klass(formattedMessage);
        // Extend the error with the properties of the original error and the `props` object
        extend_error_1.extendError(newError, originalError, props);
        return newError;
    };
}
//# sourceMappingURL=ono.js.map