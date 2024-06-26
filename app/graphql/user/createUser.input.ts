import {Field, InputType} from "type-graphql";
import {IsEmail, MaxLength, MinLength} from "class-validator";

@InputType()
export class UserInput {
    @Field()
    @MinLength(3)
    @MaxLength(32)
    username: string
    @Field()
    @MinLength(8)
    password: string
    @Field()
    @IsEmail()
    email: string
}