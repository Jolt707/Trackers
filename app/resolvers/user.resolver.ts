/*
Name: Jensen Stamp
Description:
Date: 2/8/24
*/
import {Container, Service} from "typedi";
import {Arg, Args, Authorized, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {User} from "../models/user.model";
import {UserInput} from "../graphql/user/createUser.input";
import argon2 from "argon2";
import {Context} from "../graphql/server/context";


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
    @Query(() => User)
    async currentUser(@Ctx() ctx: Context) {
        return ctx.user
    }
}