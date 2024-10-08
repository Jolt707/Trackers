"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const type_graphql_1 = require("type-graphql");
const date_1 = require("../graphql/date");
let Task = class Task extends sequelize_typescript_1.Model {
};
exports.Task = Task;
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true
    }),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Task.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Task.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column,
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true
    }),
    (0, type_graphql_1.Field)(() => String, {
        nullable: true
    }),
    __metadata("design:type", Object)
], Task.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE
    }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Task.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE
    }),
    (0, type_graphql_1.Field)(() => date_1.DateType, { nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "dueDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Task.prototype, "priority", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE
    }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Task.prototype, "updatedAt", void 0);
exports.Task = Task = __decorate([
    sequelize_typescript_1.Table,
    (0, type_graphql_1.ObjectType)()
], Task);
//# sourceMappingURL=task.js.map