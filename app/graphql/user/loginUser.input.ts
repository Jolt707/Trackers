import {Field, InputType} from "type-graphql";
import {IsEmail, MaxLength, MinLength} from "class-validator";

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