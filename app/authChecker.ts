import {Context} from "./graphql/server/context";
import {AuthChecker, ResolverData} from "type-graphql";
import {Session} from "./models/session.model";
import {GraphQLError} from "graphql";
import {User} from "./models/user.model";

export const authChecker: AuthChecker<Context> = async (
    { context }: ResolverData<Context>,
    options: any[]
) => {
    const token = context.token

    if(!token) throw new GraphQLError("Please login.")

    const session = await Session.findOne({
        where: {
            token
        },
        include: [
            {
                model: User,
                as: "user"
            }
        ]
    })

    if(!session) throw new GraphQLError("Please login.")

    context.user = session.user
    context.token = token

    return true

}
