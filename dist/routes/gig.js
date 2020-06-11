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
const express_1 = require("express");
const gig_controller_1 = require("../controllers/gig_controller");
const router = express_1.Router();
router.route("/").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.status(404).json({ error: gigs.error });
        return;
    }
    res.json(gigs);
}));
router.route("/search").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const key = Object.keys(req.query)[0];
    if (key === "location") {
        const gig = yield gig_controller_1.queryGigBaseOnLocation(req.query.location);
        if (gig.error) {
            res.status(404).json({ error: gig.error });
            return;
        }
        res.json(gig);
    }
    else if (key === "proficiency") {
        const gig = yield gig_controller_1.queryGigBaseOnProficiency(req.query.proficiency);
        if (gig.error) {
            res.status(404).json({ error: gig.error });
            return;
        }
        res.json(gig);
    }
    else if (key === "tech") {
        console.log(req.query.tech);
        const gig = yield gig_controller_1.queryGigBaseOnTechnology(req.query.tech);
        if (gig.error) {
            res.status(404).json({ error: gig.error });
            return;
        }
        res.json(gig);
    }
}));
router.route("/query").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let location = req.query.location;
    let proficiency = req.query.proficiency;
    let technology = req.query.tech;
    const search = {
        location,
        proficiency,
        technology,
    };
    const gig = yield gig_controller_1.baseOnLocationProficiencyTech(search);
    if (gig.error) {
        res.status(404).json({ error: gig.error });
        return;
    }
    res.json(gig);
}));
router.route("/:id").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gig = yield gig_controller_1.getGig(Number(req.params.id));
    if (gig.error) {
        res.status(404).json({ error: gig.error });
        return;
    }
    res.json(gig);
}));
router.route("/").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gig = yield gig_controller_1.createGig(req.body);
    if (gig.error) {
        res.status(404).json({ error: gig.error });
        return;
    }
    res.json(gig);
}));
router.route("/:updateId").patch((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { updateId } = req.params;
    const gig = yield gig_controller_1.updateGig(Number(updateId), req.body);
    if (gig.error) {
        res.status(404).json({ error: gig.error });
        return;
    }
    res.json(gig);
}));
router.route("/:deleteId").delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deleteId } = req.params;
    const gig = yield gig_controller_1.deleteGig(Number(deleteId));
    if (gig.error) {
        res.status(404).json({ error: gig.error });
        return;
    }
    res.json(gig);
}));
exports.default = router;
//# sourceMappingURL=gig.js.map