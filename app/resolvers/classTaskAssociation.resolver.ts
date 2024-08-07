import { Service } from "typedi";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Class } from "../models/class.model";
import { Context } from "../graphql/server/context";
import { GraphQLError } from "graphql";
import { ClassTaskAssociationInput } from "../graphql/task/classTaskAssociation.input";
import { Task } from "../models/task.model";
import { ClassTaskAssociation } from "../models/classTaskAssociation.model";
import { TaskClassAssociationInput } from "../graphql/task/taskClassAssociation.input";

@Service()
@Resolver(ClassTaskAssociation)
export class ClassTaskResolver {
  @Authorized()
  @Mutation(() => [ClassTaskAssociation])
  async addTasksToClass(@Arg("input") input: ClassTaskAssociationInput, @Ctx() ctx: Context) {
    const classItem = await Class.findOne({
      where: {
        teacherId: ctx.user!.id,
        id: input.classId
      }
    })
    if (!classItem) {
      throw new GraphQLError("Class not found")
    }
    const tasks = await Task.findAll({
      where: {
        id: input.taskId
      }
    })
    const associations = []
    for (const task of tasks) {
      const find = await ClassTaskAssociation.findOne({
        where: {
          taskId: task.id,
          classId: input.classId,
        }
      })
      if (find) {
        await find.destroy()
        continue
      }
      const association = await ClassTaskAssociation.create({
        taskId: task.id,
        classId: input.classId,
      })
      associations.push(association)
    }
    return associations;
  }
  @Authorized()
  @Mutation(() => [ClassTaskAssociation])
  async addClassesToTask(@Arg("input") input: TaskClassAssociationInput, @Ctx() ctx: Context) {
    const taskItem = await Task.findOne({
      where: {
        userId: ctx.user!.id,
        id: input.taskId
      }
    })
    if (!taskItem) {
      throw new GraphQLError("Task not found")
    }
    const classes = await Class.findAll({
      where: {
        id: input.classId
      }
    })
    const associations = []
    for (const classItem of classes) {
      const find = await ClassTaskAssociation.findOne({
        where: {
          classId: classItem.id,
          taskId: input.taskId,
        }
      })
      if (find) {
        await find.destroy()
        continue
      }
      const association = await ClassTaskAssociation.create({
        classId: classItem.id,
        taskId: input.taskId,
      })
      associations.push(association)
    }
    return associations;
  }
}