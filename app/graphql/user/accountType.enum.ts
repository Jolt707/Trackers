/*
Name: Jensen Stamp
Description: This is the enum that defined the 3 account types
Date: 11/8/24
*/
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