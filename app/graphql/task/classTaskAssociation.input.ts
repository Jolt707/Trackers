/*
Name: Jensen Stamp
Description: This is the input used to create a classTask association (array of tasks into one class)
Date: 11/8/24
*/

import { Field, InputType } from "type-graphql";

@InputType()
export class ClassTaskAssociationInput {
  @Field()
  classId: number;

  @Field(() => [Number])
  taskId: number[];
}