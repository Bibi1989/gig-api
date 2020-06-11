import { capitalizeString } from "../utils/capitalize";
import { EInterface, GInterface } from "../utils/interfaces";
import { validate } from "../utils/validates";
const { Op } = require("sequelize");

const models = require("../../database/models/");

const { Gig } = models;

export const createGig = async (gig: GInterface) => {
  const data = validate(gig);
  if (data.errors) {
    return { status: "error", error: data.errors };
  }

  const gigDetail = await Gig.create(gig);

  return { status: "success", data: gigDetail };
};

export const getAllGigs = async (query: {
  offset: number;
  limit: number;
  page: number;
}) => {
  const { offset, limit, page } = query;
  try {
    const gigs = await Gig.findAll({
      limit: limit,
      offset: offset,
    });
    const new_gig = await Gig.findAll();
    return { status: "success", count: new_gig.length, page: page, data: gigs };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const getGig = async (id: number) => {
  try {
    const gig = await Gig.findOne({ where: { id } });
    if (!gig) return { status: "error", error: "Gig not found!!!" };
    return { status: "success", data: gig };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const queryGigBaseOnLocation = async (location: string) => {
  const text = capitalizeString(location);
  console.log(text);
  try {
    const gig = await Gig.findAll({ where: { location } });
    if (!gig) return { status: "error", error: "Gig not found!!!" };
    return { status: "success", data: gig };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const queryGigBaseOnProficiency = async (proficiency: string) => {
  try {
    const gig = await Gig.findAll({ where: { proficiency } });
    if (!gig) return { status: "error", error: "Gig not found!!!" };
    return { status: "success", data: gig };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const queryGigBaseOnTechnology = async (tech: string) => {
  try {
    const gig = await Gig.findAll({
      where: { technologies: { [Op.contains]: [tech] } },
    });
    if (!gig) return { status: "error", error: "Gig not found!!!" };
    return { status: "success", data: gig };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const baseOnLocationProficiencyTech = async (tech: any) => {
  const techObj = {
    ...tech,
    technology: tech.technology === undefined ? "" : tech.technology,
  };
  const { location, proficiency, technology } = techObj;
  console.log(techObj);
  try {
    const gig = await Gig.findAll({
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
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const updateGig = async (id: number, gig: GInterface) => {
  try {
    const findGig = await Gig.findOne({ where: { id } });

    if (!findGig) {
      return { status: "error", error: "Gig not found!!!" };
    }

    const data = validate(gig);
    if (data.errors) {
      return { status: "error", error: data.errors };
    }

    await Gig.update(gig, { where: { id } });

    return { status: "success", data: "updated!! successfully!!!" };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const deleteGig = async (id: number) => {
  try {
    const del = await Gig.findOne({ where: { id } });

    if (!del) return { status: "error", error: "Gig not found" };

    await Gig.destroy({ where: { id } });
    return { status: "success", data: "Deleted successfully!!!" };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

// const {
//   first_name,
//   last_name,
//   email,
//   phone,
//   password,
//   stack,
//   github_url,
//   linkedin_url,
//   technologies,
//   proficiency,
//   location,
//   profile,
//   experience,
//   yoe,
// } = gig;
