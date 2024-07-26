import { Service } from "typedi";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/user.model";
import { Context } from "../graphql/server/context";
import { Task } from "../models/task";
import { CreateTaskInput } from "../graphql/task/createTask.input";
import { DeleteTaskInput } from "../graphql/task/deleteTask.input";
import { UpdateTaskInput } from "../graphql/task/updateTask.input";
import { TaskStatusInput } from "../graphql/task/taskStatus.input";

@Service()
@Resolver(Task)
export class TaskResolver {
  @Mutation(() => Task)
  async createTask(@Arg("input") input: CreateTaskInput) {
    return await Task.create({
      ...input,
      userId: 1,
      completedTask: false
    });
  }

  @Query(() => [Task])
  async tasks(@Arg("input") input: TaskStatusInput) {
    const tasks = await Task.findAll({
      where: {
        completedTask: input.completedTask
      }
    });
    return tasks;
  }

  @Mutation(() => Boolean)
  async deleteTask(@Arg("input") input: DeleteTaskInput) {
    await Task.destroy({
      where: {
        id: input.taskId,
        userId: 1,
      },
    });
    return true;
  }

  @Mutation(() => Task)
  async updateTask(@Arg("input") input: UpdateTaskInput) {
    await Task.update(input, {
      where: {
        id: input.taskId,
        userId: 1,
      },
    });
    return await Task.findByPk(input.taskId);
  }
}
