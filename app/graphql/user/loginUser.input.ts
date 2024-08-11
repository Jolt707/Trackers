/*
Name: Jensen Stamp
Description: This is the input used for the login details
Date: 2/8/24
*/
import {Field, InputType} from "type-graphql";
import { MaxLength, MinLength} from "class-validator";

@InputType()
export class LoginInput {
    @Field()
    @MinLength(3)
    @MaxLength(32)
    username: string
    @Field()
    @MinLength(8)
    password: string
}