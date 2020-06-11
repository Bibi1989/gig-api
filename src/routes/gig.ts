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
} from "../controllers/gig_controller";

const router = Router();

router.route("/").get(async (req, res) => {
  let limit = req.query.limit ? Number(req.query.limit) : 10;
  let page = req.query.page ? Number(req.query.page) : 0;

  let offset = limit * (page - 1);

  let queryObj = {
    limit,
    offset,
    page,
  };

  const gigs = await getAllGigs(queryObj);
  if (gigs.error) {
    res.status(404).json({ error: gigs.error });
    return;
  }
  res.json(gigs);
});

router.route("/search").get(async (req, res) => {
  const key = Object.keys(req.query)[0];
  if (key === "location") {
    const gig = await queryGigBaseOnLocation(req.query.location);
    if (gig.error) {
      res.status(404).json({ error: gig.error });
      return;
    }
    res.json(gig);
  } else if (key === "proficiency") {
    const gig = await queryGigBaseOnProficiency(req.query.proficiency);
    if (gig.error) {
      res.status(404).json({ error: gig.error });
      return;
    }
    res.json(gig);
  } else if (key === "tech") {
    console.log(req.query.tech);
    const gig = await queryGigBaseOnTechnology(req.query.tech);
    if (gig.error) {
      res.status(404).json({ error: gig.error });
      return;
    }
    res.json(gig);
  }
});

router.route("/query").get(async (req, res) => {
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
    res.status(404).json({ error: gig.error });
    return;
  }
  res.json(gig);
});

router.route("/:id").get(async (req, res) => {
  const gig = await getGig(Number(req.params.id));
  if (gig.error) {
    res.status(404).json({ error: gig.error });
    return;
  }
  res.json(gig);
});

router.route("/").post(async (req, res) => {
  const gig = await createGig(req.body);
  if (gig.error) {
    res.status(404).json({ error: gig.error });
    return;
  }
  res.json(gig);
});

router.route("/:updateId").patch(async (req, res) => {
  const { updateId } = req.params;
  const gig = await updateGig(Number(updateId), req.body);
  if (gig.error) {
    res.status(404).json({ error: gig.error });
    return;
  }
  res.json(gig);
});

router.route("/:deleteId").delete(async (req, res) => {
  const { deleteId } = req.params;
  const gig = await deleteGig(Number(deleteId));
  if (gig.error) {
    res.status(404).json({ error: gig.error });
    return;
  }
  res.json(gig);
});

export default router;
