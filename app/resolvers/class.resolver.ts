import { Service } from "typedi";
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Class } from "../models/class.model";
import { Context } from "../graphql/server/context";
import { CreateClassInput } from "../graphql/class/createClass.input";
import { User } from "../models/user.model";

@Service()
@Resolver(Class)
export class ClassResolver {
  @Authorized()
  @Mutation(() => Class)
  async createClass(@Arg("input") input: CreateClassInput, @Ctx() ctx: Context) {
    return await Class.create({
      ...input,
      teacherId: ctx.user!.id,
    });
  }

  @FieldResolver(() => [User])
  students(@Root() classItem: Class) {
    return classItem.$get("students")
  }

  @Authorized()
  @Query(() => [Class])
  async classes(@Ctx() ctx: Context) {
    const classes = await Class.findAll({
      where: {
        teacherId: ctx.user!.id,
      }
    });
    return classes;
  }
}
