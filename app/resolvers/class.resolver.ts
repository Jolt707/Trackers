/*
Name: Jensen Stamp
Description: This is the class resolver which contains the code to modify classes
Date: 11/8/24
*/
import { Service } from "typedi";
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Class } from "../models/class.model";
import { Context } from "../graphql/server/context";
import { CreateClassInput } from "../graphql/class/createClass.input";
import { User } from "../models/user.model";
import { AccountType } from "../graphql/user/accountType.enum";
import { ClassUserAssociation } from "../models/classUserAssociation.model";
import { DeleteClassInput } from "../graphql/class/deleteClass.input";
import { UpdateClassInput } from "../graphql/class/updateClass.input";

@Service()
@Resolver(Class)
export class ClassResolver {
  @Authorized()
  // Returns the class
  @Mutation(() => Class)
  // Create class function with the CreateClassInput from the createClass.input.ts
  async createClass(@Arg("input") input: CreateClassInput, @Ctx() ctx: Context) {
    // Uses the context of the current user to check if it is not a teacher then a class is not created
    if (ctx.user!.accountType !== AccountType.TEACHER) {
      return
    }
    // Creates a class with the input and sets the teacherId to the current user
    return await Class.create({
      ...input,
      teacherId: ctx.user!.id,
    });
  }

  @Authorized()
  @Mutation(() => Boolean)
  // Delete class function with the DeleteClassInput from the deleteClass.input.ts
  async deleteClass(@Arg("input") input: DeleteClassInput, @Ctx() ctx: Context) {
    // Destroys the class with the input id and teacherId
    await Class.destroy({
      where: {
        id: input.classId,
        teacherId: ctx.user!.id,
      },
    });
    return true;
  }

  @Authorized()
  @Mutation(() => Class)
  // Updates a class with the UpdateClassInput from the updateClass.input.ts
  async updateClass(@Arg("input") input: UpdateClassInput, @Ctx() ctx: Context) {
    // Updates the class with the input id and teacherId
    await Class.update(input, {
      where: {
        id: input.classId,
        teacherId: ctx.user!.id,
      },
    });
    // Finds the class row by the primary key of the input.classId
    return await Class.findByPk(input.classId);
  }

  // This field resolver is used to give the students to the class
  @FieldResolver(() => [User])
  students(@Root() classItem: Class) {
    return classItem.$get("students")
  }

  // This field resolver is used to give the tasks to the class
  @FieldResolver(() => [Class])
  tasks(@Root() classItem: Class) {
    return classItem.$get("tasks")
  }

  @Authorized()
  @Query(() => [Class])
  // Finds the classes of either the teacher or the student (user)
  async classes(@Ctx() ctx: Context) {
    // Finds all the classes owned by the teacher
    if (ctx.user!.accountType === AccountType.TEACHER) {
      const classes = await Class.findAll({
        where: {
          teacherId: ctx.user!.id,
        }
      });
      // Returns the classes
      return classes;
    }
    // Finds the students (users) classes from the ClassUserAssociation
    else if (ctx.user!.accountType === AccountType.USER) {
      return await Class.findAll({
        include: [{as: "student", model: ClassUserAssociation, where: {
          userId: ctx.user!.id,
          },
        required: true}]
      })
    }
    else {
      return[]
    }
  }
}
