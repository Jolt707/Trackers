import { Service } from "typedi";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/user.model";
import { Context } from "../graphql/server/context";
import { Task } from "../models/task";
import { CreateTaskInput } from "../graphql/task/createTask.input";

@Service()
@Resolver(Task)
export class TaskResolver {
  @Mutation(() => Task)
  async createTask(@Arg("input")input:CreateTaskInput){
    return await Task.create({
      ...input,
      userId: 1
    });
  }

  @Query(()=>[Task])
  async tasks() {
    const tasks = await Task.findAll({

    })
    console.log(tasks)
    return tasks
  }
}