/*
Name: Jensen Stamp
Description: This is the user resolver, has some code with unfinished functionality, returns the current user
Date: 11/8/24
*/
import { Service } from "typedi";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {User} from "../models/user.model";
import {Context} from "../graphql/server/context";
import { LinkParentInput } from "../graphql/user/linkParent.input";
import { GraphQLError } from "graphql";


@Service()
@Resolver(User)
export class UserResolver {
    @Authorized()
    @Mutation(() => User)
    // UNFINISHED FUNCTIONALITY links the parent to the student account with an email
    async linkParent(@Arg("input") input: LinkParentInput, @Ctx() ctx: Context) {
        const parent = await User.findOne({
            where: {
                email: input.email
            }
        })
        if (!parent) {
            throw new GraphQLError("No account found")
        }
        await parent.update({
            studentId: ctx.user!.id
        })
        return parent
    }

    @Authorized()
    @Query(() => User)
    // Returns the ctx.user which is populated by authCheck.ts (called by @Authorized)
    async currentUser(@Ctx() ctx: Context) {
        return ctx.user
    }
}