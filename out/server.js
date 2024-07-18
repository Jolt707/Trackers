"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const typedi_1 = require("typedi");
const graphql_yoga_1 = require("graphql-yoga");
const type_graphql_1 = require("type-graphql");
const user_resolver_1 = require("./resolvers/user.resolver");
const node_http_1 = require("node:http");
const db_1 = __importDefault(require("./db"));
const auth_resolver_1 = require("./resolvers/auth.resolver");
const authChecker_1 = require("./authChecker");
const task_resolver_1 = require("./resolvers/task.resolver");
let Server = class Server {
    constructor() {
        this.ErrorInterceptor = async ({ context, info }, next) => {
            try {
                return await next();
            }
            catch (err) {
                console.log(JSON.stringify(err));
            }
        };
    }
    async init() {
        db_1.default;
        // Create a Yoga instance with a GraphQL schema.
        const schema = await (0, type_graphql_1.buildSchema)({
            resolvers: [user_resolver_1.UserResolver, auth_resolver_1.AuthResolver, task_resolver_1.TaskResolver],
            globalMiddlewares: [this.ErrorInterceptor],
            authChecker: authChecker_1.authChecker,
        });
        const yoga = (0, graphql_yoga_1.createYoga)({ schema, context: (initialContext) => {
                return {
                    token: initialContext?.request?.headers?.get("Authorization")
                };
            } });
        // Pass it into a server to hook into request handlers.
        const server = (0, node_http_1.createServer)(yoga);
        // Start the server and you're done!
        server.listen(6969, () => {
            console.info('Server is running on http://localhost:6969/graphql');
        });
    }
};
exports.Server = Server;
exports.Server = Server = __decorate([
    (0, typedi_1.Service)()
], Server);
//# sourceMappingURL=server.js.map