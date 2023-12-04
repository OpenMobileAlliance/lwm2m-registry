"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isomorphic_node_1 = require("./isomorphic.node");
const ono_1 = require("./ono");
exports.Ono = ono_1.Ono;
exports.ono = ono_1.ono;
const to_json_1 = require("./to-json");
// Create Ono instances for each of the JavaScript error types
ono_1.ono.error = new ono_1.Ono(Error);
ono_1.ono.eval = new ono_1.Ono(EvalError);
ono_1.ono.range = new ono_1.Ono(RangeError);
ono_1.ono.reference = new ono_1.Ono(ReferenceError);
ono_1.ono.syntax = new ono_1.Ono(SyntaxError);
ono_1.ono.type = new ono_1.Ono(TypeError);
ono_1.ono.uri = new ono_1.Ono(URIError);
// Default to Node's `util.format()` functionality, but allow users to substitute their own
ono_1.ono.formatter = isomorphic_node_1.formatter;
/**
 * Returns an object containing all properties of the given Error object,
 * which can be used with `JSON.stringify()`.
 */
ono_1.Ono.toJSON = function toJSON(error) {
    return to_json_1.toJSON.call(error);
};
// tslint:disable-next-line: no-default-export
exports.default = ono_1.ono;
// CommonJS default export hack
if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = Object.assign(module.exports.default, module.exports); // tslint:disable-line: no-unsafe-any
}
//# sourceMappingURL=index.js.map