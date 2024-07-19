import { Field, InputType, Int } from "type-graphql";

@InputType()
export class DeleteTaskInput {
  @Field(() => Int)
  taskId: number
}