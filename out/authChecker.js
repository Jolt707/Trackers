"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authChecker = void 0;
const session_model_1 = require("./models/session.model");
const graphql_1 = require("graphql");
const user_model_1 = require("./models/user.model");
const authChecker = async ({ context }, options) => {
    const token = context.token;
    if (!token)
        throw new graphql_1.GraphQLError("Please login.");
    const session = await session_model_1.Session.findOne({
        where: {
            token
        },
        include: [
            {
                model: user_model_1.User,
                as: "user"
            }
        ]
    });
    if (!session)
        throw new graphql_1.GraphQLError("Please login.");
    context.user = session.user;
    context.token = token;
    return true;
};
exports.authChecker = authChecker;
//# sourceMappingURL=authChecker.js.map