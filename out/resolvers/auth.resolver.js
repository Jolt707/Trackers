"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const typedi_1 = require("typedi");
const type_graphql_1 = require("type-graphql");
const user_model_1 = require("../models/user.model");
const createUser_input_1 = require("../graphql/user/createUser.input");
const argon2_1 = __importDefault(require("argon2"));
const loginUser_output_1 = require("../graphql/user/loginUser.output");
const loginUser_input_1 = require("../graphql/user/loginUser.input");
const graphql_1 = require("graphql");
const session_model_1 = require("../models/session.model");
const crypto_random_string_1 = __importDefault(require("crypto-random-string"));
let AuthResolver = class AuthResolver {
    async register(input) {
        const user = await user_model_1.User.create({
            username: input.username,
            password: await argon2_1.default.hash(input.password),
            admin: false,
            email: input.email
        });
        const session = await session_model_1.Session.create({
            userId: user.id,
            token: (0, crypto_random_string_1.default)({
                length: 128
            })
        });
        return {
            token: session.token,
            user
        };
    }
    async login(input) {
        const user = await user_model_1.User.findOne({
            where: {
                username: input.username
            }
        });
        if (!user)
            throw new graphql_1.GraphQLError("DeeZ");
        if (!await argon2_1.default.verify(user.password, input.password))
            throw new graphql_1.GraphQLError("DeeZPass");
        const session = await session_model_1.Session.create({
            userId: user.id,
            token: (0, crypto_random_string_1.default)({
                length: 128
            })
        });
        return {
            token: session.token,
            user
        };
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => loginUser_output_1.LoginUser),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => loginUser_output_1.LoginUser),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginUser_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)()
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map