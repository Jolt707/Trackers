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
  @Mutation(() => Class)
  async createClass(@Arg("input") input: CreateClassInput, @Ctx() ctx: Context) {
    if (ctx.user!.accountType !== AccountType.TEACHER) {
      return
    }
    return await Class.create({
      ...input,
      teacherId: ctx.user!.id,
    });
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteClass(@Arg("input") input: DeleteClassInput, @Ctx() ctx: Context) {
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
  async updateClass(@Arg("input") input: UpdateClassInput, @Ctx() ctx: Context) {
    await Class.update(input, {
      where: {
        id: input.classId,
        teacherId: ctx.user!.id,
      },
    });
    return await Class.findByPk(input.classId);
  }

  @FieldResolver(() => [User])
  students(@Root() classItem: Class) {
    return classItem.$get("students")
  }

  @FieldResolver(() => [Class])
  tasks(@Root() classItem: Class) {
    return classItem.$get("tasks")
  }

  @Authorized()
  @Query(() => [Class])
  async classes(@Ctx() ctx: Context) {
    if (ctx.user!.accountType === AccountType.TEACHER) {
      const classes = await Class.findAll({
        where: {
          teacherId: ctx.user!.id,
        }
      });
      return classes;
    }
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
