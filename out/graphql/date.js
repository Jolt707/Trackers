"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateType = void 0;
const type_1 = require("graphql/type");
const language_1 = require("graphql/language");
exports.DateType = new type_1.GraphQLScalarType({
    name: "Date",
    //@ts-ignore
    parseLiteral(ast) {
        if (ast.kind === language_1.Kind.INT) {
            return parseInt(ast.value, 10);
        }
        return null;
    },
    //@ts-ignore
    parseValue(value) {
        return new Date(value);
    },
    //@ts-ignore
    serialize(value) {
        return typeof value === "string" ? value : value.toISOString();
    }
});
//# sourceMappingURL=date.js.map