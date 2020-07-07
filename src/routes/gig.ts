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

const router = Router();

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
  let location = req.query.location.toLowerCase();
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
  const body = {
    ...req.body,
    location: req.body.location.toLowerCase(),
  };
  const gig = await createGig(body, Number(id));
  if (gig.error) {
    return next(gig);
  }
  res.json(gig);
});
router.patch("/upload/:id", authenticate, async (req: any, res) => {
  const response = await uploadImage(req, req.params.id);
  if (response.status === "error") {
    res.status(404).json({ error: response.error });
  }
  res.json(response);
});
// router.patch("/upload/:id", (req: any, res) => {
//   // const images = await uploadImage(req.body.image);
//   console.log(req.file); // to see what is returned to you
//   const image = {
//     url: "",
//     id: "",
//   };
//   image.url = req.file.url;
//   image.id = req.file.public_id;
//   console.log(image);
//   models.Gig.update(
//     { ...req.body.gig, ...image },
//     { where: { id: Number(req.params.id) } }
//   ) // save image information in database
//     .then((newImage: any) => res.json(newImage))
//     .catch((err: Error) => console.log(err));
//   // res.json({ data: images });
// });

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
