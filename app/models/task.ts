import {Column, DataType, Model, Table} from "sequelize-typescript";
import {Field, Int, ObjectType} from "type-graphql";

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
  @Field()
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