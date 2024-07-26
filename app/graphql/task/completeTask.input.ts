import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CompleteTaskInput {
  @Field(() => Int)
  taskId: number
  @Field()
  completedTask: boolean
}