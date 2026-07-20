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
exports.ScheduleGroupsController = void 0;
const common_1 = require("@nestjs/common");
const create_schedule_group_dto_1 = require("./dto/create-schedule-group.dto");
const schedule_groups_service_1 = require("./schedule-groups.service");
let ScheduleGroupsController = class ScheduleGroupsController {
    scheduleGroupsService;
    constructor(scheduleGroupsService) {
        this.scheduleGroupsService = scheduleGroupsService;
    }
    findAll() {
        return this.scheduleGroupsService.findAll();
    }
    create(data) {
        return this.scheduleGroupsService.create(data);
    }
    addMember(groupId, memberId, day) {
        return this.scheduleGroupsService.addMember(groupId, memberId, day);
    }
    removeMember(groupId, memberId) {
        return this.scheduleGroupsService.removeMember(groupId, memberId);
    }
    remove(id) {
        return this.scheduleGroupsService.remove(id);
    }
};
exports.ScheduleGroupsController = ScheduleGroupsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ScheduleGroupsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_schedule_group_dto_1.CreateScheduleGroupDto]),
    __metadata("design:returntype", void 0)
], ScheduleGroupsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':groupId/members/:memberId'),
    __param(0, (0, common_1.Param)('groupId')),
    __param(1, (0, common_1.Param)('memberId')),
    __param(2, (0, common_1.Body)('day')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ScheduleGroupsController.prototype, "addMember", null);
__decorate([
    (0, common_1.Delete)(':groupId/members/:memberId'),
    __param(0, (0, common_1.Param)('groupId')),
    __param(1, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ScheduleGroupsController.prototype, "removeMember", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScheduleGroupsController.prototype, "remove", null);
exports.ScheduleGroupsController = ScheduleGroupsController = __decorate([
    (0, common_1.Controller)('schedule-groups'),
    __metadata("design:paramtypes", [schedule_groups_service_1.ScheduleGroupsService])
], ScheduleGroupsController);
//# sourceMappingURL=schedule-groups.controller.js.map