"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("module-alias/register");
const typedi_1 = require("typedi");
const server_1 = require("./server");
const server = typedi_1.Container.get(server_1.Server);
server.init();
//# sourceMappingURL=index.js.map