"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const capitalize_1 = require("../utils/capitalize");
const validates_1 = require("../utils/validates");
const { Op } = require("sequelize");
const models = require("../../database/models/");
const { Gig } = models;
exports.createGig = (gig) => __awaiter(void 0, void 0, void 0, function* () {
    const data = validates_1.validate(gig);
    if (data.errors) {
        return { status: "error", error: data.errors };
    }
    const gigDetail = yield Gig.create(gig);
    return { status: "success", data: gigDetail };
});
exports.getAllGigs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset, limit, page } = query;
    try {
        const gigs = yield Gig.findAll({
            limit: limit,
            offset: offset,
        });
        const new_gig = yield Gig.findAll();
        return { status: "success", count: new_gig.length, page, data: gigs };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.getGig = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gig = yield Gig.findOne({ where: { id } });
        if (!gig)
            return { status: "error", error: "Gig not found!!!" };
        return { status: "success", data: gig };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.queryGigBaseOnLocation = (location) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = capitalize_1.capitalizeString(location);
        if (!text)
            return { status: "error", error: "Gig not found!!!" };
        const gig = yield Gig.findAll({ where: { location } });
        if (!gig || gig.length <= 0)
            return { status: "error", data: [] };
        return { status: "success", data: gig };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.queryGigBaseOnProficiency = (proficiency) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gig = yield Gig.findAll({ where: { proficiency } });
        if (!gig)
            return { status: "error", error: "Gig not found!!!" };
        return { status: "success", data: gig };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.queryGigBaseOnTechnology = (tech) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gig = yield Gig.findAll({
            where: { technologies: { [Op.contains]: [tech] } },
        });
        if (!gig)
            return { status: "error", error: "Gig not found!!!" };
        return { status: "success", data: gig };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.baseOnLocationProficiencyTech = (tech) => __awaiter(void 0, void 0, void 0, function* () {
    const techObj = Object.assign(Object.assign({}, tech), { technology: tech.technology === undefined ? "" : tech.technology });
    const { location, proficiency, technology } = techObj;
    console.log(techObj);
    try {
        const gig = yield Gig.findAll({
            where: {
                [Op.or]: {
                    [Op.and]: [{ location, proficiency }],
                    technologies: {
                        [Op.contains]: [technology],
                    },
                },
            },
        });
        if (!gig || gig.length === 0)
            return { status: "error", error: "Gig not found!!!" };
        return { status: "success", data: gig };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.updateGig = (id, gig) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findGig = yield Gig.findOne({ where: { id } });
        if (!findGig) {
            return { status: "error", error: "Gig not found!!!" };
        }
        const data = validates_1.validate(gig);
        if (data.errors) {
            return { status: "error", error: data.errors };
        }
        yield Gig.update(gig, { where: { id } });
        return { status: "success", data: "updated!! successfully!!!" };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.deleteGig = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const del = yield Gig.findOne({ where: { id } });
        if (!del)
            return { status: "error", error: "Gig not found" };
        yield Gig.destroy({ where: { id } });
        return { status: "success", data: "Deleted successfully!!!" };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
//# sourceMappingURL=gig_controller.js.map