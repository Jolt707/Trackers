import { Field, InputType } from "type-graphql";
import { STRING } from "sequelize";

@InputType()
export class CreateTaskInput {
  @Field()
  title: string
  @Field(()=> String, {nullable:true})
  description: string | null
  @Field(()=> String, {nullable:true})
  notes: string | null
  @Field(()=> String, {nullable:true})
  dueDate: string | null
  @Field()
  priority: number
}