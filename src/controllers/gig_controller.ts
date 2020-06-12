import { capitalizeString } from "../utils/capitalize";
import { GInterface } from "../utils/interfaces";
import { validate } from "../utils/validates";
const { Op } = require("sequelize");

const models = require("../../database/models/");

const { Gig } = models;

export const createGig = async (gig: GInterface, id: number) => {
  try {
    const data = validate(gig);
    if (data.errors) {
      return { status: "error", error: data.errors };
    }

    const find_gig = await Gig.findOne({ where: { id } });

    if (find_gig)
      return {
        status: "error",
        error: "You can't add another edit your profile",
      };

    const gigDetail = await Gig.create({ ...gig, user: id });

    return { status: "success", data: gigDetail };
  } catch (error) {
    return { status: "error", error: error.message };
  }
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
    return { status: "success", count: new_gig.length, page, data: gigs };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const getGig = async (id: number) => {
  try {
    const gig = await Gig.findAll({ where: { user: id } });
    if (!gig) return { status: "error", error: "Gig not found!!!" };
    return { status: "success", data: gig };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const queryGigBaseOnLocation = async (location: string) => {
  try {
    const text = capitalizeString(location);
    if (!text) return { status: "error", error: "Gig not found!!!" };
    const gig = await Gig.findAll({ where: { location } });
    if (!gig || gig.length <= 0) return { status: "error", data: [] };
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
