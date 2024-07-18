"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_json_1 = __importDefault(require("./config/config.json"));
const sequelize = new sequelize_typescript_1.Sequelize({
    ...config_json_1.default.development,
    models: [__dirname + "/models"],
    modelMatch: () => {
        return true;
    }
});
exports.default = sequelize;
//# sourceMappingURL=db.js.map