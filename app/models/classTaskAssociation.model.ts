/*
Name: Jensen Stamp
Description: UNFINISHED
Date: 2/8/24
*/
import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { Field, Int, ObjectType } from "type-graphql";
import { DateType } from "../graphql/date";


@Table
@ObjectType()
export class Class extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId  : number;

  @Column
  @Field(() => Int)
  taskId

  @BelongsTo(() => Task, "taskId")
  Task: Task

}