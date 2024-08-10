/*
Name: Jensen Stamp
Description:
Date: 2/8/24
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
    @Query(() => User, {
        nullable: true
    })
    async user(@Arg("username") username: string) {
        return await User.findOne({
            where: {
                username
            }
        })
    }

    @Authorized()
    @Mutation(() => User)
    async linkParent(@Arg("input") input: LinkParentInput, @Ctx() ctx: Context) {
        const parent = await User.findOne({
            where: {
                email: input.email
            }
        })
        if (!parent) {
            throw new GraphQLError("Deez")
        }
        await parent.update({
            studentId: ctx.user!.id
        })
        return parent
    }

    @Authorized()
    @Query(() => User)
    async currentUser(@Ctx() ctx: Context) {
        return ctx.user
    }
}