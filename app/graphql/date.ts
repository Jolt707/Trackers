/*
Name: Jensen Stamp
Description: This is a file used to define DateType (a date value)
Date: 11/8/24
*/
import { GraphQLScalarType } from "graphql/type"
import { Kind } from "graphql/language"

export const DateType = new GraphQLScalarType({
  name: "Date",
  //@ts-ignore
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10)
    }
    return null
  },
  //@ts-ignore
  parseValue(value: string): Date | null {
    if(!value) return null
    return new Date(value)
  },
  //@ts-ignore
  serialize(value: string | Date): string | null {
    if(!value) return null
    return typeof value === "string" ? value : value.toISOString()
  }
})
