/*
Name: Jensen Stamp
Description: UNFINISHED
Date: 2/8/24
*/
import { BelongsTo, BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Field, Int, ObjectType } from "type-graphql";
import { DateType } from "../graphql/date";
import { HasMany } from "sequelize";
import { User } from "./user.model";
import { ClassUserAssociation } from "./classUserAssociation.model";

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

  @BelongsTo(() => ClassUserAssociation, "classId")
  student: User

}