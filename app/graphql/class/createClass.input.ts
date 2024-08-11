/*
Name: Jensen Stamp
Description: This is the input used to create a class
Date: 11/8/24
*/

import { Field, InputType } from "type-graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateClassInput {
  @Field()
  @MinLength(1, {
    message: "Please put in a title",
  })
  name: string;
}