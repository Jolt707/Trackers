/*
Name: Jensen Stamp
Description: This is the input used to complete a task
Date: 2/8/24
*/
import { Field, InputType, Int } from "type-graphql";


@InputType()
export class CompleteTaskInput {
  @Field(() => Int)
  taskId: number
  @Field()
  completedTask: boolean
}