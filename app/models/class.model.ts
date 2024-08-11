/*
Name: Jensen Stamp
Description: This is the class model to define the possible fields for a class
Date: 11/8/24
*/
import { HasOne, BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Field, Int, ObjectType } from "type-graphql";
import { DateType } from "../graphql/date";
import { User } from "./user.model";
import { ClassUserAssociation } from "./classUserAssociation.model";
import { ClassTaskAssociation } from "./classTaskAssociation.model";
import { Task } from "./task.model";

@Table
@ObjectType()
export class Class extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  @Field(() => Int)
  id: number;

  @Column
  @Field(() => Int)
  teacherId: number

  @Column
  @Field()
  name: string;

  @Column({
    type: DataType.DATE,
  })
  @Field()
  createdAt: string;

  @Column({
    type: DataType.DATE,
  })
  @Field(() => DateType, { nullable: false })
  updatedAt: string;

  @BelongsToMany(() => User, () => ClassUserAssociation, "classId", "userId")
  @Field(() => [User])
  students: User[]

  @HasOne(() => ClassUserAssociation, "classId")
  student: User

  @BelongsToMany(() => Task, () => ClassTaskAssociation, "classId", "taskId")
  @Field(() => [Task])
  tasks: Task[]

}