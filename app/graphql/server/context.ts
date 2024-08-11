/*
Name: Jensen Stamp
Description: This is the type information for the context file
Date: 11/8/24
*/
import {User} from "../../models/user.model";

export type Context = {
    user: User | null | undefined
    token: string
}
