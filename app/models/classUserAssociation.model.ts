/*
Name: Jensen Stamp
Description: UNFINISHED
Date: 2/8/24
*/
import { BelongsTo, Column, Model, Table } from "sequelize-typescript";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./user.model";
import { Class } from "./class.model";

@Table
@ObjectType()
export class ClassUserAssociation extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  @Field(() => Int)
  id: number;

  @Column
  @Field(() => Int)
  userId: number;

  @Column
  @Field(() => Int)
  classId: number;

  @Field(() => User)
  @BelongsTo(() => User, "userId")
  user: User

  @Field(() => Class)
  @BelongsTo(() => Class, "classId")
  class: Class

}