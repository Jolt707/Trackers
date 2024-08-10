/*
Name: Jensen Stamp
Description: This is the input used to create a task
Date: 2/8/24
*/

import { Field, InputType } from "type-graphql";

@InputType()
export class LinkParentInput {
  @Field(() => String)
  email: string;
}