/*
Name: Jensen Stamp
Description: This is a task resolver that modifies the tasks
Date: 11/8/24
*/
import { Service } from "typedi";
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { User } from "../models/user.model";
import { Context } from "../graphql/server/context";
import { Task } from "../models/task.model";
import { CreateTaskInput } from "../graphql/task/createTask.input";
import { DeleteTaskInput } from "../graphql/task/deleteTask.input";
import { UpdateTaskInput } from "../graphql/task/updateTask.input";
import { TaskStatusInput } from "../graphql/task/taskStatus.input";
import { CompleteTaskInput } from "../graphql/task/completeTask.input";
import { Class } from "../models/class.model";

@Service()
@Resolver(Task)
export class TaskResolver {
  @Authorized()
  @Mutation(() => Task)
  // Create task function with the input
  async createTask(@Arg("input") input: CreateTaskInput, @Ctx() ctx: Context) {
    // Creates a task with the details from the input
    return await Task.create({
      ...input,
      userId: ctx.user!.id,
    });
  }

  @Authorized()
  @Query(() => [Task])
  // Finds all of the tasks with an input of completedTask and userId
  async tasks(@Arg("input") input: TaskStatusInput, @Ctx() ctx: Context) {
    const tasks = await Task.findAll({
      where: {
        completedTask: input.completedTask,
        userId: ctx.user!.id,
      }
    });
    return tasks;
  }

  // This field resolver is used to give the tasks to the class
  @FieldResolver(() => [Class])
  classes(@Root() taskItem: Task) {
    return taskItem.$get("classes")
  }

  @Authorized()
  @Mutation(() => Boolean)
  // Delete task function
  async deleteTask(@Arg("input") input: DeleteTaskInput, @Ctx() ctx: Context) {
    // Destroys the task with the id input
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
  // Update task function
  async updateTask(@Arg("input") input: UpdateTaskInput, @Ctx() ctx: Context) {
    // Updates the task with the input details
    await Task.update(input, {
      where: {
        id: input.taskId,
        userId: ctx.user!.id,
      },
    });
    // Returns it by the primary key of taskId
    return await Task.findByPk(input.taskId);
  }

  @Authorized()
  @Mutation(() => Task)
  // Complete task function
  async completeTask(@Arg("input") input: CompleteTaskInput, @Ctx() ctx: Context) {
    // Updates the task with the complete task input, setting it to complete
    await Task.update(input, {
      where: {
        id: input.taskId,
        userId: ctx.user!.id,
      },
    });
    // Returns it by the primary key of taskId
    return await Task.findByPk(input.taskId);
  }
}
