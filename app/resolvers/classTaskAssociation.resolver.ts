/*
Name: Jensen Stamp
Description: This is the classTaskAssociation resolver which contains the code to associate classes and tasks
Date: 11/8/24
*/
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
  // Function to add multiple tasks to a class
  async addTasksToClass(@Arg("input") input: ClassTaskAssociationInput, @Ctx() ctx: Context) {
    // Defines a class item by finding a class with the teacherId of the current user and input.classId
    const classItem = await Class.findOne({
      where: {
        teacherId: ctx.user!.id,
        id: input.classId
      }
    })
    // If there is no class item, an error will be thrown
    if (!classItem) {
      throw new GraphQLError("Class not found")
    }
    // Defines tasks by finding them with the input.taskId
    const tasks = await Task.findAll({
      where: {
        id: input.taskId
      }
    })
    if (!input.taskId.length) {
      throw new GraphQLError("Please add a task")
    }
    // Defines the associations from the input
    const associations = []
    for (const task of tasks) {
      // Defines if an association can be found with the inputs task and class id
      const find = await ClassTaskAssociation.findOne({
        where: {
          taskId: task.id,
          classId: input.classId,
        }
      })
      // If the association is found, it will destroy it, making this act as a toggle when adding tasks
      if (find) {
        await find.destroy()
        continue
      }
      // Defining an association to return
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
  // Function to add multiple classes to a task
  async addClassesToTask(@Arg("input") input: TaskClassAssociationInput, @Ctx() ctx: Context) {
    // Defines a task item by finding a task with the userId of the current user and input.taskId
    const taskItem = await Task.findOne({
      where: {
        userId: ctx.user!.id,
        id: input.taskId
      }
    })
    // If there is no task item, an error will be thrown
    if (!taskItem) {
      throw new GraphQLError("Task not found")
    }
    // Defines the classes by finding them all from the input.classId
    const classes = await Class.findAll({
      where: {
        id: input.classId
      }
    })
    if (!input.classId.length) {
      throw new GraphQLError("Please add a class")
    }
    // Defining an array of multiple associations with the classItem.id and input.taskId
    const associations = []
    for (const classItem of classes) {
      // Defines if an association can be found with the inputs task and class id
      const find = await ClassTaskAssociation.findOne({
        where: {
          classId: classItem.id,
          taskId: input.taskId,
        }
      })
      // If an association is found it gets destroyed, making it act as a toggle
      if (find) {
        await find.destroy()
        continue
      }
      // Defining an association to return
      const association = await ClassTaskAssociation.create({
        classId: classItem.id,
        taskId: input.taskId,
      })
      associations.push(association)
    }
    return associations;
  }
}