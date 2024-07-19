import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UpdateTaskInput {
  @Field(() => Int)
  taskId: number
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
  @Field()
  updatedAt: string

}