import { registerEnumType } from "type-graphql";

export enum AccountType {
  USER = "USER",
  TEACHER = "TEACHER",
  PARENT = "PARENT"
}
registerEnumType(AccountType, {
  name: "AccountType",
  description: "Account type",
})