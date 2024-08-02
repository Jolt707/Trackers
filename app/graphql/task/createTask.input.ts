/*
Name: Jensen Stamp
Description: This is the input used to create a task
Date: 2/8/24
*/
import { Field, InputType } from "type-graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateTaskInput {
  @Field()
  @MinLength(1, {
    message: "Please put in a title",
  })
  title: string;
  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  notes: string | null;

  @Field(() => String, { nullable: true })
  dueDate: string | null;

  @Field()
  priority: number;
}
