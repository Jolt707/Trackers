import { Service } from "typedi";
import {createYoga, YogaServer} from "graphql-yoga";
import {buildSchema, MiddlewareFn} from "type-graphql";
import {UserResolver} from "./resolvers/user.resolver";
import {createServer} from "node:http"
import db from "./db";
import {AuthResolver} from "./resolvers/auth.resolver";
import {authChecker} from "./authChecker";
import { TaskResolver } from "./resolvers/task.resolver";
import { ClassResolver } from "./resolvers/class.resolver";
import { ClassUserResolver } from "./resolvers/classUserAssociation.resolver";
import { ClassTaskResolver } from "./resolvers/classTaskAssociation.resolver";
@Service()
export class Server {
    graphqlServer: YogaServer<any, any>

    ErrorInterceptor: MiddlewareFn<any> = async ({ context, info }, next) => {
        try {
            return await next();
        } catch (err) {
            console.log(JSON.stringify(err))
        }
    };

    async init() {
        db
        // Create a Yoga instance with a GraphQL schema.
        const schema = await buildSchema({
            resolvers: [UserResolver, AuthResolver, TaskResolver, ClassResolver, ClassUserResolver, ClassTaskResolver],
            globalMiddlewares: [this.ErrorInterceptor],
            authChecker: authChecker,
        });
        const yoga = createYoga({ schema, context: (initialContext) => {
            return {
                token: initialContext?.request?.headers?.get("Authorization")
            }
            } })

        // Pass it into a server to hook into request handlers.
        const server = createServer(yoga)

        // Start the server and you're done!
        server.listen(6969, () => {
            console.info('Server is running on http://localhost:6969/graphql')
        })
    }
}