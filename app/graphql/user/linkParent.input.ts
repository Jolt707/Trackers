/*
Name: Jensen Stamp
Description: This is the input used link a parent account to a student (UNFINISHED FUNCTIONALITY)
Date: 11/8/24
*/

import { Field, InputType } from "type-graphql";

@InputType()
export class LinkParentInput {
  @Field(() => String)
  email: string;
}