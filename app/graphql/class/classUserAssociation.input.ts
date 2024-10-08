/*
Name: Jensen Stamp
Description: This is the input used to create a classUser association
Date: 11/8/24
*/

import { Field, InputType } from "type-graphql";

@InputType()
export class ClassUserAssociationInput {
  @Field()
  classId: number;

  @Field(() => [String])
  emails: string[];
}