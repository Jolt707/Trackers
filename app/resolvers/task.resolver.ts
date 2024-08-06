/*
Name: Jensen Stamp
Description: UNFINISHED
Date: 2/8/24
*/
import { Service } from "typedi";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/user.model";
import { Context } from "../graphql/server/context";
import { Task } from "../models/task.model";
import { CreateTaskInput } from "../graphql/task/createTask.input";
import { DeleteTaskInput } from "../graphql/task/deleteTask.input";
import { UpdateTaskInput } from "../graphql/task/updateTask.input";
import { TaskStatusInput } from "../graphql/task/taskStatus.input";
import { CompleteTaskInput } from "../graphql/task/completeTask.input";

@Service()
@Resolver(Task)
export class TaskResolver {
  @Authorized()
  @Mutation(() => Task)
  async createTask(@Arg("input") input: CreateTaskInput, @Ctx() ctx: Context) {
    return await Task.create({
      ...input,
      userId: ctx.user!.id,
    });
  }

  @Authorized()
  @Query(() => [Task])
  async tasks(@Arg("input") input: TaskStatusInput, @Ctx() ctx: Context) {
    const tasks = await Task.findAll({
      where: {
        completedTask: input.completedTask,
        userId: ctx.user!.id,
      }
    });
    return tasks;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteTask(@Arg("input") input: DeleteTaskInput, @Ctx() ctx: Context) {
    await Task.destroy({
      where: {
        id: input.taskId,
        userId: ctx.user!.id,
      },
    });
    return true;
  }

  @Authorized()
  @Mutation(() => Task)
  async updateTask(@Arg("input") input: UpdateTaskInput, @Ctx() ctx: Context) {
    await Task.update(input, {
      where: {
        id: input.taskId,
        userId: ctx.user!.id,
      },
    });
    return await Task.findByPk(input.taskId);
  }

  @Authorized()
  @Mutation(() => Task)
  async completeTask(@Arg("input") input: CompleteTaskInput, @Ctx() ctx: Context) {
    await Task.update(input, {
      where: {
        id: input.taskId,
        userId: ctx.user!.id,
      },
    });
    return await Task.findByPk(input.taskId);
  }
}
