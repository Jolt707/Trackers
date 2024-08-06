/*
Name: Jensen Stamp
Description: This is the auth resolver which validates the login or register, and returns the session and token
Date: 2/8/24
*/
import {Service} from "typedi";
import {Arg, Mutation, Resolver} from "type-graphql";
import {User} from "../models/user.model";
import {UserInput} from "../graphql/user/createUser.input";
import argon2 from "argon2";
import {LoginUser} from "../graphql/user/loginUser.output";
import {LoginInput} from "../graphql/user/loginUser.input";
import {GraphQLError} from "graphql";
import {Session} from "../models/session.model";
import cryptoRandomString from "crypto-random-string";

@Service()
@Resolver()
export class AuthResolver {
    @Mutation(() => LoginUser)
    async register(@Arg("input") input: UserInput)   {
        const user = await User.create({
            username: input.username,
            password: await argon2.hash(input.password),
            accountType: input.accountType,
            email: input.email
        })
        const session = await Session.create({
            userId: user.id,
            token: cryptoRandomString({
                length: 128
            })
        })
        return {
            token: session.token,
            user
        }
    }
    @Mutation(() => LoginUser)
    async login(@Arg("input") input: LoginInput) {
        const user = await User.findOne({
            where: {
                username: input.username
            }
        })
        if (!user) throw new GraphQLError("DeeZ")
        if (!await argon2.verify(user.password, input.password)) throw new GraphQLError("DeeZPass")
        const session = await Session.create({
            userId: user.id,
            token: cryptoRandomString({
                length: 128
            })
        })
        return {
            token: session.token,
            user
        }
    }
}