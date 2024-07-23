import { Field, InputType } from "type-graphql";
import { STRING } from "sequelize";
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
