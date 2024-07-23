import { MinLength } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UpdateTaskInput {
  @Field(() => Int)
  taskId: number;
  @Field()
  @MinLength(1, {
    message: "Please put in a title"
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
