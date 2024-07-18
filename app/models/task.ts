import {Column, DataType, Model, Table} from "sequelize-typescript";
import {Field, Int, ObjectType} from "type-graphql";
import { DateType } from "../graphql/date";

@Table
@ObjectType()
export class Task extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  @Field(() => Int)
  id: number

  @Column
  @Field(() => Int)
  userId: number

  @Column
  @Field()
  title: string

  @Column
  @Field()
  description: string

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  @Field(() => String, {
    nullable: true
  })
  notes: string | null

  @Column({
    type: DataType.DATE
  })
  @Field()
  createdAt: string

  @Column({
    type: DataType.DATE
  })
  @Field(()=> DateType, {nullable:true})
  dueDate: string

  @Column
  @Field()
  priority: number

  @Column({
    type: DataType.DATE
  })
  @Field()
  updatedAt: string
}