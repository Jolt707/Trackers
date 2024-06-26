import * as fs from "fs";
import {Sequelize} from "sequelize-typescript";
import config from "./config/config.json"

const sequelize = new Sequelize({
    ...config.development as any,
    models: [__dirname + "/models"],
    modelMatch: () => {
        return true
    }
})

export default sequelize