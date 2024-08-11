/*
Name: Jensen Stamp
Description: This is the auth resolver which creates an account from the UserInput, or finds an account and returns the session
Date: 11/8/24
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
    // @Mutation returning LoginUser
    @Mutation(() => LoginUser)
    // Defining the function and the argument of UserInput from createUser.input.ts
    async register(@Arg("input") input: UserInput)   {
        // Defining a user and creating one with the input details
        const user = await User.create({
            username: input.username,
            // Hashing the password for security with Argon 2
            password: await argon2.hash(input.password),
            accountType: input.accountType,
            email: input.email
        })
        // Creating and defining a session for the registering user
        const session = await Session.create({
            userId: user.id,
            // Creating a random session token for local storage
            token: cryptoRandomString({
                length: 128
            })
        })
        // Returning the token and user
        return {
            token: session.token,
            user
        }
    }
    // @Mutation returning LoginUser
    @Mutation(() => LoginUser)
    async login(@Arg("input") input: LoginInput) {
        // Finds the user that matches the input.username
        const user = await User.findOne({
            where: {
                username: input.username
            }
        })
        // Throws an error if the username wasn't found
        if (!user) throw new GraphQLError("Username is incorrect")
        // Throws an error if the password doesn't match
        if (!await argon2.verify(user.password, input.password)) throw new GraphQLError("Password is incorrect")
        // Again defining the session and token to return it
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