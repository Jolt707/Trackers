import { Field, InputType } from "type-graphql";

@InputType()
export class TaskStatusInput {
  @Field()
  completedTask: boolean
}