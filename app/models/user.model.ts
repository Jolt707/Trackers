/*
Name: Jensen Stamp
Description: This is the user model to define the fields for the user
Date: 2/8/24
*/
import {Column, DataType, Model, Table} from "sequelize-typescript";
import {Field, Int, ObjectType} from "type-graphql";
import { AccountType } from "../graphql/user/accountType.enum";

@Table
@ObjectType()
export class User extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    @Field(() => Int)
    id: number

    @Column
    @Field()
    username: string

    @Column
    @Field()
    password: string

    @Column({
        type: DataType.DATE
    })
    @Field(() => String, {
        nullable: true
    })
    avatar: string | null

    @Column({
        type: DataType.DATE
    })
    @Field()
    createdAt: string

    @Column({
        type: DataType.DATE
    })
    @Field()
    updatedAt: string

    @Column({
        type: DataType.ENUM("USER", "TEACHER", "PARENT"),
    })
    @Field(() => AccountType)
    accountType: AccountType

    @Column
    @Field()
    email: string
}