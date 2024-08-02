/*
Name: Jensen Stamp
Description: This is to define the session model
Date: 2/8/24
*/
import {BelongsTo, Column, DataType, Model, Table} from "sequelize-typescript";
import {Field, Int, ObjectType} from "type-graphql";
import {Col} from "sequelize/types/utils";
import {User} from "./user.model";

@Table
@ObjectType()
export class Session extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    @Field(() => Int)
    id: number

    @Column
    @Field()
    token: string

    @Column
    @Field(() => Int)
    userId: number

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

    @BelongsTo(() => User, "userId")
    @Field(() => User)
    user: User
}