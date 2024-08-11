/*
Name: Jensen Stamp
Description: This is the user resolver, has some code with unfinished functionality, returns the current user
Date: 11/8/24
*/
import {Context} from "./graphql/server/context";
import {AuthChecker, ResolverData} from "type-graphql";
import {Session} from "./models/session.model";
import {GraphQLError} from "graphql";
import {User} from "./models/user.model";

export const authCheck: AuthChecker<Context> = async (
    { context }: ResolverData<Context>,
    options: any[]
) => {
    const token = context.token
    // If there is no token, throws an error to login
    if(!token) throw new GraphQLError("Please login.")
    // Finds the session with the token and includes the user
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
    // If there is no session, throws an error to login
    if(!session) throw new GraphQLError("Please login.")
    // Sets the user and token
    context.user = session.user
    context.token = token

    return true

}
