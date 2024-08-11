/*
Name: Jensen Stamp
Description: This is the input used to create a taskClass association (multiple classes into a task)
Date: 11/8/24
*/

import { Field, InputType } from "type-graphql";

@InputType()
export class TaskClassAssociationInput {
  @Field(() => [Number])
  classId: number[];

  @Field()
  taskId: number;
}