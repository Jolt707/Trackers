import { Column, DataType, Model, Table } from "sequelize-typescript";
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

  @Column
  @Field(() => Int)
  teacherId: number

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

}