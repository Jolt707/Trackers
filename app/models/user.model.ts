import {Column, DataType, Model, Table} from "sequelize-typescript";
import {Field, Int, ObjectType} from "type-graphql";

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
    @Column
    @Field()
    admin: boolean
    @Column
    @Field()
    email: string
}