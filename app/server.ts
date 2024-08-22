import { Container, Service } from "typedi";
import { createYoga, maskError, YogaServer } from "graphql-yoga";
import {buildSchema, MiddlewareFn} from "type-graphql";
import {UserResolver} from "./resolvers/user.resolver";
import {createServer} from "node:http"
import db from "./db";
import {AuthResolver} from "./resolvers/auth.resolver";
import {authCheck} from "./authCheck";
import { TaskResolver } from "./resolvers/task.resolver";
import { ClassResolver } from "./resolvers/class.resolver";
import { ClassUserResolver } from "./resolvers/classUserAssociation.resolver";
import { ClassTaskResolver } from "./resolvers/classTaskAssociation.resolver";
import { ValidationError } from "sequelize";
import { GraphQLError } from "graphql";
@Service()
export class Server {
    // Throws unhandled errors for each resolver
    ErrorInterceptor: MiddlewareFn<any> = async ({ context, info }, next) => {
        try {
            return await next();
        } catch (err) {
            console.log(JSON.stringify(err))
        }
    };

    async init() {
        // Calls sequelize to connect with the database
        db
        // Generate GraphQLSchema based on resolvers
        const schema = await buildSchema({
            resolvers: [UserResolver, AuthResolver, TaskResolver, ClassResolver, ClassUserResolver, ClassTaskResolver],
            authChecker: authCheck,
            container: Container,
            validate: {
                forbidUnknownValues: false
            }
        });
        // Create a GraphQL server instance with a GraphQL schema.
        const yoga = createYoga({ schema, context: (initialContext) => {
            return {
                token: initialContext?.request?.headers?.get("Authorization")
            }
            },
            maskedErrors: {
                maskError(error: any, message: any, isDev: any): Error {
                    console.log(error, message, isDev)
                    return error
                }
            }
             })
        const server = createServer(yoga)

        server.listen(6969, () => {
            console.info('Server is running on http://localhost:6969/graphql')
        })
    }
}