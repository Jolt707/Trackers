/*
Name: Jensen Stamp
Description: This is the classTaskAssociation it "associates" or links classes and tasks with the @BelongsTo fields
Date: 11/8/24
*/
import { BelongsTo, Column, Model, Table } from "sequelize-typescript";
import { Field, Int, ObjectType } from "type-graphql";
import { Task } from "./task.model"
import { Class } from "./class.model";

@Table
@ObjectType()
export class ClassTaskAssociation extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  @Field(() => Int)
  id: number;

  @Column
  @Field(() => Int)
  taskId: number;

  @Column
  @Field(() => Int)
  classId: number;

  @Field(() => Task)
  @BelongsTo(() => Task, "taskId")
  task: Task

  @Field(() => Class)
  @BelongsTo(() => Class, "classId")
  class: Class

}