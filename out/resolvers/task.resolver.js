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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskResolver = void 0;
const typedi_1 = require("typedi");
const type_graphql_1 = require("type-graphql");
const task_1 = require("../models/task");
const createTask_input_1 = require("../graphql/task/createTask.input");
let TaskResolver = class TaskResolver {
    async createTask(input) {
        return await task_1.Task.create({
            ...input,
            userId: 1
        });
    }
    async tasks() {
        const tasks = await task_1.Task.findAll({});
        console.log(tasks);
        return tasks;
    }
};
exports.TaskResolver = TaskResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => task_1.Task),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTask_input_1.CreateTaskInput]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "createTask", null);
__decorate([
    (0, type_graphql_1.Query)(() => [task_1.Task]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "tasks", null);
exports.TaskResolver = TaskResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(task_1.Task)
], TaskResolver);
//# sourceMappingURL=task.resolver.js.map