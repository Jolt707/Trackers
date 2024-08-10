/*
Name: Jensen Stamp
Description: This is the input used to update a task with edit details
Date: 2/8/24
*/
import { MinLength } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UpdateClassInput {
  @Field(() => Int)
  classId: number;

  @Field()
  @MinLength(1, {
    message: "Please put in a name"
  })
  name: string;
}
