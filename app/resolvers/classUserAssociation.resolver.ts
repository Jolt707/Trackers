import { Service } from "typedi";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Class } from "../models/class.model";
import { ClassUserAssociation } from "../models/classUserAssociation.model";
import { Task } from "../models/task.model";
import { CreateTaskInput } from "../graphql/task/createTask.input";
import { Context } from "../graphql/server/context";
import { ClassUserAssociationInput } from "../graphql/class/classUserAssociation.input";
import { GraphQLError } from "graphql";
import { User } from "../models/user.model";

@Service()
@Resolver(ClassUserAssociation)
export class ClassUserResolver {
  @Authorized()
  @Mutation(() => [ClassUserAssociation])
  async addUsersToClass(@Arg("input") input: ClassUserAssociationInput, @Ctx() ctx: Context) {
    const classItem = await Class.findOne({
      where: {
        teacherId: ctx.user!.id,
        id: input.classId
      }
    })
    if (!classItem) {
      throw new GraphQLError("Class not found")
    }
    const users = await User.findAll({
      where: {
        email: input.emails
      }
    })
    if (users.length !== input.emails.length) {
      throw new GraphQLError("Email not found")
    }
    const associations = []
    for (const user of users) {
      const association = await ClassUserAssociation.create({
        userId: user.id,
        classId: input.classId,
      })
      associations.push(association)
    }
    return associations;
  }
}