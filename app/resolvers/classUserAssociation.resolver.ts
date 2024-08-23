/*
Name: Jensen Stamp
Description: This is the classUserAssociation resolver which contains the code to associate classes and users
Date: 11/8/24
*/
import { Service } from "typedi";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Class } from "../models/class.model";
import { ClassUserAssociation } from "../models/classUserAssociation.model";
import { Context } from "../graphql/server/context";
import { ClassUserAssociationInput } from "../graphql/class/classUserAssociation.input";
import { GraphQLError } from "graphql";
import { User } from "../models/user.model";
import { AccountType } from "../graphql/user/accountType.enum";

@Service()
@Resolver(ClassUserAssociation)
export class ClassUserResolver {
  @Authorized()
  @Mutation(() => [ClassUserAssociation])
  // Function to add multiple users to a class with the ClassUserAssociationInput
  async addUsersToClass(@Arg("input") input: ClassUserAssociationInput, @Ctx() ctx: Context) {
    // Defines the classItem with the current user's teacherId and input.classId
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
    // Defining the users from the email inputs
    const users = await User.findAll({
      where: {
        email: input.emails
      }
    })
    // If there are no users, throw an error
    if (!input.emails.length) {
      throw new GraphQLError("Please add a student's email")
    }
    // Validation to check if the users length is equal to the email input length, throws an error
    if (users.length !== input.emails.length) {
      throw new GraphQLError("Email not found, check each table element")
    }
    // Defines associations
    const associations = []
    for (const user of users) {
      // If the accountType is not a user, it does not add it
      if (user.accountType !== AccountType.USER) {
        continue
      }
      // Defining if an association can be found with the user.id anf input.classId
      const find = await ClassUserAssociation.findOne({
        where: {
          userId: user.id,
          classId: input.classId,
        }
      })
      // If it is found, it does not add it
      if (find) {
        await find.destroy()
        continue
      }
      // Creates an association with the user.id and input.classId and returns them
      const association = await ClassUserAssociation.create({
        userId: user.id,
        classId: input.classId,
      })
      associations.push(association)
    }
    return associations;
  }
}