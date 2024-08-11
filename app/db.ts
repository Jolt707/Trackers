/*
Name: Jensen Stamp
Description: This is the user resolver, has some code with unfinished functionality, returns the current user
Date: 11/8/24
*/
import {Sequelize} from "sequelize-typescript";
import config from "./config/config.json"

// Creates a sequelize object to interact with the database
const sequelize = new Sequelize({
    ...config.development as any,
    models: [__dirname + "/models"],
    modelMatch: () => {
        return true
    }
})

export default sequelize