import { Router } from "express";
import authenticate from "./auth";
import {
  createGig,
  getAllGigs,
  updateGig,
  getGig,
  queryGigBaseOnLocation,
  queryGigBaseOnProficiency,
  queryGigBaseOnTechnology,
  baseOnLocationProficiencyTech,
  deleteGig,
  uploadImage,
} from "../controllers/gig_controller";
import { v2 } from "cloudinary";
const multer = require("multer");
import cloudinaryStorage from "multer-storage-cloudinary";

const models = require("../../database/models/");

const router = Router();

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary: v2,
  folder: "demo",
  transformation: [{ width: 500, height: 500, crop: "limit" }],
} as any);
const parser = multer({ storage: storage });

router.route("/").get(async (req, res, next) => {
  let limit = req.query.limit ? Number(req.query.limit) : 10;
  let page = req.query.page ? Number(req.query.page) : 1;

  let offset = limit * (page - 1);

  let queryObj = {
    limit,
    offset,
    page,
  };

  const gigs = await getAllGigs(queryObj);
  if (gigs.error) {
    return next(gigs);
  }
  res.json(gigs);
});

router.route("/search").get(async (req, res, next) => {
  const key = Object.keys(req.query)[0];
  if (key === "location") {
    const gig = await queryGigBaseOnLocation(req.query.location);
    if (gig.error) {
      return next(gig);
    }
    res.json(gig);
  } else if (key === "proficiency") {
    const gig = await queryGigBaseOnProficiency(req.query.proficiency);
    if (gig.error) {
      return next(gig);
    }
    res.json(gig);
  } else if (key === "tech") {
    console.log(req.query.tech);
    const gig = await queryGigBaseOnTechnology(req.query.tech);
    if (gig.error) {
      return next(gig);
    }
    res.json(gig);
  }
});

router.route("/query").get(async (req, res, next) => {
  let location = req.query.location;
  let proficiency = req.query.proficiency;
  let technology = req.query.tech;

  const search = {
    location,
    proficiency,
    technology,
  };

  const gig = await baseOnLocationProficiencyTech(search);

  if (gig.error) {
    return next(gig);
  }
  res.json(gig);
});

router.route("/profile").get(authenticate, async (req: any, res, next) => {
  const { id } = req.user;
  const gig = await getGig(Number(id));
  if (gig.error) {
    return next(gig.error);
  }
  res.json(gig);
});

router.post("/", authenticate, async (req: any, res: any, next) => {
  const { id } = req.user;
  const gig = await createGig(req.body, Number(id));
  if (gig.error) {
    return next(gig);
  }
  res.json(gig);
});
router.patch("/upload/:id", parser.single("image"), (req: any, res) => {
  // const images = await uploadImage(req.body.image);
  console.log(req.file); // to see what is returned to you
  const image = {
    url: "",
    id: "",
  };
  image.url = req.file.url;
  image.id = req.file.public_id;
  console.log(image);
  models.Gig.update(
    { ...req.body.gig, ...image },
    { where: { id: Number(req.params.id) } }
  ) // save image information in database
    .then((newImage: any) => res.json(newImage))
    .catch((err: Error) => console.log(err));
  // res.json({ data: images });
});

router.route("/:updateId").patch(authenticate, async (req, res, next) => {
  const { updateId } = req.params;
  const gig = await updateGig(Number(updateId), req.body);
  if (gig.error) {
    return next(gig);
  }
  res.json(gig);
});

router.route("/:deleteId").delete(authenticate, async (req, res, next) => {
  const { deleteId } = req.params;
  const gig = await deleteGig(Number(deleteId));
  if (gig.error) {
    return next(gig);
  }
  res.json(gig);
});

export default router;
