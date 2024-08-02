/*
Name: Jensen Stamp
Description: This is the input used to delete a task
Date: 2/8/24
*/
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class DeleteTaskInput {
  @Field(() => Int)
  taskId: number
}