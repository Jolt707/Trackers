/*
Name: Jensen Stamp
Description: This is the input used to delete a class
Date: 11/8/24
*/
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class DeleteClassInput {
  @Field(() => Int)
  classId: number
}