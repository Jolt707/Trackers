/*
Name: Jensen Stamp
Description: UNFINISHED
Date: 2/8/24
*/
import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { Field, Int, ObjectType } from "type-graphql";
import { DateType } from "../graphql/date";
import { User } from "./user.model";
import { Task } from "./task.model";
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