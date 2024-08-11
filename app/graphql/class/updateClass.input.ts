/*
Name: Jensen Stamp
Description: This is the input used to update a class with a new name
Date: 11/8/24
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
