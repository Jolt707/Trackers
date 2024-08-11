import "reflect-metadata"
import "module-alias/register"
import {Container} from "typedi";
import {Server} from "./server";

// Create an instance of the server class
const server = Container.get(Server)
server.init()