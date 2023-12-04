"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findResponseContent = exports.deprecationWarning = exports.ajvErrorsToValidatorError = exports.augmentAjvErrors = exports.ContentType = void 0;
class ContentType {
    constructor(contentType) {
        this.contentType = null;
        this.mediaType = null;
        this.charSet = null;
        this.withoutBoundary = null;
        this.contentType = contentType;
        if (contentType) {
            this.withoutBoundary = contentType.replace(/;\s{0,}boundary.*/, '');
            this.mediaType = this.withoutBoundary.split(';')[0].trim();
            this.charSet = this.withoutBoundary.split(';')[1];
            this.isWildCard = RegExp(/^[a-z]+\/\*$/).test(this.contentType);
            if (this.charSet) {
                this.charSet = this.charSet.trim();
            }
        }
    }
    static from(req) {
        return new ContentType(req.headers['content-type']);
    }
    static fromString(type) {
        return new ContentType(type);
    }
    equivalents() {
        if (!this.withoutBoundary)
            return [];
        if (this.charSet) {
            return [this.mediaType, `${this.mediaType}; ${this.charSet}`];
        }
        return [this.withoutBoundary, `${this.mediaType}; charset=utf-8`];
    }
}
exports.ContentType = ContentType;
/**
 * (side-effecting) modifies the errors object
 * TODO - do this some other way
 * @param errors
 */
function augmentAjvErrors(errors = []) {
    errors.forEach((e) => {
        if (e.keyword === 'enum') {
            const params = e.params;
            const allowedEnumValues = params === null || params === void 0 ? void 0 : params.allowedValues;
            e.message = !!allowedEnumValues
                ? `${e.message}: ${allowedEnumValues.join(', ')}`
                : e.message;
        }
    });
    return errors;
}
exports.augmentAjvErrors = augmentAjvErrors;
function ajvErrorsToValidatorError(status, errors) {
    return {
        status,
        errors: errors.map((e) => {
            var _a, _b;
            const params = e.params;
            const required = (params === null || params === void 0 ? void 0 : params.missingProperty) && e.dataPath + '.' + params.missingProperty;
            const additionalProperty = (params === null || params === void 0 ? void 0 : params.additionalProperty) &&
                e.dataPath + '.' + params.additionalProperty;
            const path = (_b = (_a = required !== null && required !== void 0 ? required : additionalProperty) !== null && _a !== void 0 ? _a : e.dataPath) !== null && _b !== void 0 ? _b : e.schemaPath;
            return {
                path,
                message: e.message,
                errorCode: `${e.keyword}.openapi.validation`,
            };
        }),
    };
}
exports.ajvErrorsToValidatorError = ajvErrorsToValidatorError;
exports.deprecationWarning = process.env.NODE_ENV !== 'production' ? console.warn : () => { };
/**
 *
 * @param accepts the list of accepted media types
 * @param expectedTypes - expected media types defined in the response schema
 * @returns the content-type
 */
exports.findResponseContent = function (accepts, expectedTypes) {
    const expectedTypesSet = new Set(expectedTypes);
    // if accepts are supplied, try to find a match, and use its validator
    for (const accept of accepts) {
        const act = ContentType.fromString(accept);
        if (act.contentType === '*/*') {
            return expectedTypes[0];
        }
        else if (expectedTypesSet.has(act.contentType)) {
            return act.contentType;
        }
        else if (expectedTypesSet.has(act.mediaType)) {
            return act.mediaType;
        }
        else if (act.isWildCard) {
            // wildcard of type application/*
            const [type] = act.contentType.split('/', 1);
            for (const expectedType of expectedTypesSet) {
                if (new RegExp(`^${type}\/.+$`).test(expectedType)) {
                    return expectedType;
                }
            }
        }
        else {
            for (const expectedType of expectedTypes) {
                const ect = ContentType.fromString(expectedType);
                if (ect.mediaType === act.mediaType) {
                    return expectedType;
                }
            }
        }
    }
    return null;
};
//# sourceMappingURL=util.js.map