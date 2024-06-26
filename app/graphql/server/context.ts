import {User} from "../../models/user.model";

export type Context = {
    user: User | null | undefined
    token: string
    meta: Record<string, any>
}
