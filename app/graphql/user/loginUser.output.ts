import {Field, ObjectType} from "type-graphql";
import {User} from "../../models/user.model";

@ObjectType()
export class LoginUser {
    @Field()
    token: string
    @Field(() => User)
    user: User
}