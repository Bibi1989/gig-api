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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const gig_controller_1 = require("../controllers/gig_controller");
const cloudinary_1 = require("cloudinary");
const multer = require("multer");
const multer_storage_cloudinary_1 = __importDefault(require("multer-storage-cloudinary"));
const models = require("../../database/models/");
const router = express_1.Router();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const storage = multer_storage_cloudinary_1.default({
    cloudinary: cloudinary_1.v2,
    folder: "demo",
    transformation: [{ width: 500, height: 500, crop: "limit" }],
});
const parser = multer({ storage: storage });
router.route("/").get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let limit = req.query.limit ? Number(req.query.limit) : 10;
    let page = req.query.page ? Number(req.query.page) : 1;
    let offset = limit * (page - 1);
    let queryObj = {
        limit,
        offset,
        page,
    };
    const gigs = yield gig_controller_1.getAllGigs(queryObj);
    if (gigs.error) {
        return next(gigs);
    }
    res.json(gigs);
}));
router.route("/search").get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const key = Object.keys(req.query)[0];
    if (key === "location") {
        const gig = yield gig_controller_1.queryGigBaseOnLocation(req.query.location);
        if (gig.error) {
            return next(gig);
        }
        res.json(gig);
    }
    else if (key === "proficiency") {
        const gig = yield gig_controller_1.queryGigBaseOnProficiency(req.query.proficiency);
        if (gig.error) {
            return next(gig);
        }
        res.json(gig);
    }
    else if (key === "tech") {
        console.log(req.query.tech);
        const gig = yield gig_controller_1.queryGigBaseOnTechnology(req.query.tech);
        if (gig.error) {
            return next(gig);
        }
        res.json(gig);
    }
}));
router.route("/query").get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let location = req.query.location.toLowerCase();
    let proficiency = req.query.proficiency;
    let technology = req.query.tech;
    const search = {
        location,
        proficiency,
        technology,
    };
    const gig = yield gig_controller_1.baseOnLocationProficiencyTech(search);
    if (gig.error) {
        return next(gig);
    }
    res.json(gig);
}));
router.route("/profile").get(auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const gig = yield gig_controller_1.getGig(Number(id));
    if (gig.error) {
        return next(gig.error);
    }
    res.json(gig);
}));
router.post("/", auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const body = Object.assign(Object.assign({}, req.body), { location: req.body.location.toLowerCase() });
    const gig = yield gig_controller_1.createGig(body, Number(id));
    if (gig.error) {
        return next(gig);
    }
    res.json(gig);
}));
router.patch("/upload/:id", parser.single("image"), (req, res) => {
    // const images = await uploadImage(req.body.image);
    console.log(req.file); // to see what is returned to you
    const image = {
        url: "",
        id: "",
    };
    image.url = req.file.url;
    image.id = req.file.public_id;
    console.log(image);
    models.Gig.update(Object.assign(Object.assign({}, req.body.gig), image), { where: { id: Number(req.params.id) } }) // save image information in database
        .then((newImage) => res.json(newImage))
        .catch((err) => console.log(err));
    // res.json({ data: images });
});
router.route("/:updateId").patch(auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { updateId } = req.params;
    const gig = yield gig_controller_1.updateGig(Number(updateId), req.body);
    if (gig.error) {
        return next(gig);
    }
    res.json(gig);
}));
router.route("/:deleteId").delete(auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { deleteId } = req.params;
    const gig = yield gig_controller_1.deleteGig(Number(deleteId));
    if (gig.error) {
        return next(gig);
    }
    res.json(gig);
}));
exports.default = router;
//# sourceMappingURL=gig.js.map