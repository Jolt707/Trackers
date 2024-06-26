import "reflect-metadata"
import "module-alias/register"
import {Container} from "typedi";
import {Server} from "./server";

const server = Container.get(Server)
server.init()
