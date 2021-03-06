import { capitalizeString } from "../utils/capitalize";
import { GInterface } from "../utils/interfaces";
import { validate } from "../utils/validates";
import { v2 } from "cloudinary";
import { Request } from "express";
const { Op } = require("sequelize");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const models = require("../../database/models/");

const { Gig } = models;

export const uploadImage = async (req: any, gigId: number) => {
  try {
    const findGig = await Gig.findOne({ where: { id: Number(gigId) } });

    if (!findGig) {
      return { status: "error", error: "Dev not found!!!" };
    }
    const img = await v2.uploader.upload(
      req.files.file.tempFilePath,
      { folder: "gig" },
      (err: Error, result: any) => {
        if (err) {
          console.log(err);
        }
        return result;
      }
    );
    const upload = await Gig.update(
      { profile_image: img.secure_url },
      { where: { id: Number(gigId) } }
    );
    return { status: "success", data: upload };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const createGig = async (gig: GInterface, id: number) => {
  try {
    const data = validate(gig);
    if (data.errors) {
      return { status: "error", code: 404, error: data.errors };
    }

    const find_gig = await Gig.findOne({ where: { user: id } });

    if (find_gig)
      return {
        status: "error",
        code: 404,
        error: "You can't add another edit your profile",
      };

    const gigDetail = await Gig.create({ ...gig, user: id });

    return { status: "success", data: gigDetail };
  } catch (error) {
    return { status: "error", code: 500, error: error.message };
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
    return { status: "error", code: 500, error: error.message };
  }
};

export const getGig = async (id: number) => {
  try {
    const gig = await Gig.findAll({ where: { user: id } });
    if (!gig) return { status: "error", code: 404, error: "Gig not found!!!" };
    return { status: "success", data: gig };
  } catch (error) {
    return { status: "error", code: 500, error: error.message };
  }
};

export const queryGigBaseOnLocation = async (location: string) => {
  try {
    const text = capitalizeString(location);
    if (!text) return { status: "error", code: 404, error: "Gig not found!!!" };
    const gig = await Gig.findAll({ where: { location } });
    if (!gig || gig.length <= 0) return { status: "success", data: [] };
    return { status: "success", data: gig };
  } catch (error) {
    return { status: "error", code: 500, error: error.message };
  }
};

export const queryGigBaseOnProficiency = async (proficiency: string) => {
  try {
    const gig = await Gig.findAll({ where: { proficiency } });
    if (!gig || gig.length <= 0) return { status: "success", data: [] };
    return { status: "success", data: gig };
  } catch (error) {
    return { status: "error", code: 500, error: error.message };
  }
};

export const queryGigBaseOnTechnology = async (tech: string) => {
  try {
    const gig = await Gig.findAll({
      where: { technologies: { [Op.contains]: [tech] } },
    });
    if (!gig || gig.length <= 0) return { status: "success", data: [] };
    return { status: "success", data: gig };
  } catch (error) {
    return { status: "error", code: 500, error: error.message };
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
    if (!gig || gig.length === 0) return { status: "success", data: [] };
    return { status: "success", data: gig };
  } catch (error) {
    return { status: "error", code: 500, error: error.message };
  }
};

export const updateGig = async (id: number, gig: GInterface) => {
  try {
    const findGig = await Gig.findOne({ where: { id } });

    if (!findGig) {
      return { status: "error", code: 404, error: "Gig not found!!!" };
    }

    const data = validate(gig);
    if (data.errors) {
      return { status: "error", error: data.errors };
    }

    await Gig.update(gig, { where: { id } });

    return { status: "success", data: "updated!! successfully!!!" };
  } catch (error) {
    return { status: "error", code: 500, error: error.message };
  }
};

export const deleteGig = async (id: number) => {
  try {
    const del = await Gig.findOne({ where: { id } });

    if (!del) return { status: "error", error: "Gig not found" };

    await Gig.destroy({ where: { id } });
    return { status: "success", data: "Deleted successfully!!!" };
  } catch (error) {
    return { status: "error", code: 500, error: error.message };
  }
};
