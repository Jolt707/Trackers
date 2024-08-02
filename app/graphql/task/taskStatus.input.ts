/*
Name: Jensen Stamp
Description: This is the input used to check if a task is completed
Date: 2/8/24
*/
import { Field, InputType } from "type-graphql";

@InputType()
export class TaskStatusInput {
  @Field()
  completedTask: boolean
}