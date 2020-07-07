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
const cloudinary_1 = require("cloudinary");
const { Op } = require("sequelize");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const models = require("../../database/models/");
const { Gig } = models;
exports.uploadImage = (req, gigId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findGig = yield Gig.findOne({ where: { id: Number(gigId) } });
        if (!findGig) {
            return { status: "error", error: "Dev not found!!!" };
        }
        const img = yield cloudinary_1.v2.uploader.upload(req.files.file.tempFilePath, { folder: "gig" }, (err, result) => {
            if (err) {
                console.log(err);
            }
            return result;
        });
        const upload = yield Gig.update({ profile_image: img.secure_url }, { where: { id: Number(gigId) } });
        return { status: "success", data: upload };
    }
    catch (error) {
        return { status: "error", error: error.message };
    }
});
exports.createGig = (gig, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = validates_1.validate(gig);
        if (data.errors) {
            return { status: "error", code: 404, error: data.errors };
        }
        const find_gig = yield Gig.findOne({ where: { user: id } });
        if (find_gig)
            return {
                status: "error",
                code: 404,
                error: "You can't add another edit your profile",
            };
        const gigDetail = yield Gig.create(Object.assign(Object.assign({}, gig), { user: id }));
        return { status: "success", data: gigDetail };
    }
    catch (error) {
        return { status: "error", code: 500, error: error.message };
    }
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
        return { status: "error", code: 500, error: error.message };
    }
});
exports.getGig = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gig = yield Gig.findAll({ where: { user: id } });
        if (!gig)
            return { status: "error", code: 404, error: "Gig not found!!!" };
        return { status: "success", data: gig };
    }
    catch (error) {
        return { status: "error", code: 500, error: error.message };
    }
});
exports.queryGigBaseOnLocation = (location) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = capitalize_1.capitalizeString(location);
        if (!text)
            return { status: "error", code: 404, error: "Gig not found!!!" };
        const gig = yield Gig.findAll({ where: { location } });
        if (!gig || gig.length <= 0)
            return { status: "success", data: [] };
        return { status: "success", data: gig };
    }
    catch (error) {
        return { status: "error", code: 500, error: error.message };
    }
});
exports.queryGigBaseOnProficiency = (proficiency) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gig = yield Gig.findAll({ where: { proficiency } });
        if (!gig || gig.length <= 0)
            return { status: "success", data: [] };
        return { status: "success", data: gig };
    }
    catch (error) {
        return { status: "error", code: 500, error: error.message };
    }
});
exports.queryGigBaseOnTechnology = (tech) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gig = yield Gig.findAll({
            where: { technologies: { [Op.contains]: [tech] } },
        });
        if (!gig || gig.length <= 0)
            return { status: "success", data: [] };
        return { status: "success", data: gig };
    }
    catch (error) {
        return { status: "error", code: 500, error: error.message };
    }
});
exports.baseOnLocationProficiencyTech = (tech) => __awaiter(void 0, void 0, void 0, function* () {
    const techObj = Object.assign(Object.assign({}, tech), { technology: tech.technology === undefined ? "" : tech.technology });
    const { location, proficiency, technology } = techObj;
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
            return { status: "success", data: [] };
        return { status: "success", data: gig };
    }
    catch (error) {
        return { status: "error", code: 500, error: error.message };
    }
});
exports.updateGig = (id, gig) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findGig = yield Gig.findOne({ where: { id } });
        if (!findGig) {
            return { status: "error", code: 404, error: "Gig not found!!!" };
        }
        const data = validates_1.validate(gig);
        if (data.errors) {
            return { status: "error", error: data.errors };
        }
        yield Gig.update(gig, { where: { id } });
        return { status: "success", data: "updated!! successfully!!!" };
    }
    catch (error) {
        return { status: "error", code: 500, error: error.message };
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
        return { status: "error", code: 500, error: error.message };
    }
});
//# sourceMappingURL=gig_controller.js.map