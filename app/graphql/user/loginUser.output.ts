/*
Name: Jensen Stamp
Description: This is the output used to give the user and token
Date: 2/8/24
*/
import {Field, ObjectType} from "type-graphql";
import {User} from "../../models/user.model";

@ObjectType()
export class LoginUser {
    @Field()
    token: string
    @Field(() => User)
    user: User
}