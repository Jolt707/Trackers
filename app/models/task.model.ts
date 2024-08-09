/*
Name: Jensen Stamp
Description: This is the task model to define the possible fields for a task
Date: 2/8/24
*/
import { BelongsToMany, Column, DataType, Default, Model, Table } from "sequelize-typescript";
import { Field, Int, ObjectType } from "type-graphql";
import { DateType } from "../graphql/date";
import { User } from "./user.model";
import { ClassUserAssociation } from "./classUserAssociation.model";
import { ClassTaskAssociation } from "./classTaskAssociation.model";
import { Class } from "./class.model";

@Table
@ObjectType()
export class Task extends Model {
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
  @Field()
  title: string;

  @Column
  @Field()
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Field(() => String, {
    nullable: true,
  })
  notes: string | null;

  @Column({
    type: DataType.DATE,
  })
  @Field()
  createdAt: string;

  @Column({
    type: DataType.DATE,
  })
  @Field(() => DateType, { nullable: true })
  dueDate: Date;

  @Column
  @Field()
  priority: number;

  @Column({
    type: DataType.DATE,
  })
  @Field(() => DateType, { nullable: false })
  updatedAt: string;

  @Field()
  @Default(false)
  @Column
  completedTask: boolean;

  @BelongsToMany(() => Class, () => ClassTaskAssociation, "taskId", "classId")
  @Field(() => [Class])
  classes: Class[]
}
