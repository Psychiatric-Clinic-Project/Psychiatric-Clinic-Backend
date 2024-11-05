import bcrypt from "bcryptjs";
import { uploadFile } from "../../services/uploadFile.js";
import { adminModel } from "../../../database/models/admin.model.js";
import { articleModel } from "../../../database/models/article.model.js";
import {
  createdSuccessfullyMessage,
  deletedSuccessfullyMessage,
  notFoundMessage,
  retrievedSuccessfullyMessage,
  updatedSuccessfullyMessage,
} from "../../utils/index.js";
import { coachModel } from "../../../database/models/coach.model.js";

export const adminSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  const img = await uploadFile(req.file.path);

  const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
  const admin = await adminModel.create({
    name,
    email,
    password: hash,
    img,
  });
  return res.success({ admin }, createdSuccessfullyMessage("Admin"), 201);
};

export const addArticle = async (req, res) => {
  const { title, text, category } = req.body;

  const img = await uploadFile(req.file.path);
  const newArticle = new articleModel({
    title,
    text,
    img,
    category,
  });
  await newArticle.save();

  return res.success(
    { newArticle },
    createdSuccessfullyMessage("Article"),
    201
  );
};

export const getArticles = async (req, res) => {
  const articles = await articleModel.find();

  return res.success(
    { articles },
    retrievedSuccessfullyMessage("Articles"),
    200
  );
};

export const getArticleById = async (req, res) => {
  const { id } = req.params;

  const article = await articleModel.findById(id);
  if (!article) {
    return res.error(notFoundMessage("article"), 404);
  }
  return res.success({ article }, retrievedSuccessfullyMessage("Article"), 200);
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  const deletedArticle = await articleModel.findOneAndDelete(id);

  if (!deletedArticle) {
    return res.error(notFoundMessage("article"), 404);
  }
  return res.success(
    { deleteArticle },
    deletedSuccessfullyMessage("Article"),
    200
  );
};

export const updateCoach = async (req, res) => {
  const updates = req.body;

  const updatedCoach = await coachModel.findByIdAndUpdate(req.params.id, updates, { new: true });
  if (!updatedCoach) {
    return res.error(notFoundMessage("Coach"), 404);
  }
  return res.success({updatedCoach},updatedSuccessfullyMessage("Coach"),200);
}

export const getCoaches = async (req, res) => {
  const coaches = await coachModel.find();
  return res.success({ coaches }, retrievedSuccessfullyMessage("Coachs"), 200);
}

export const deleteCoach = async (req, res) => {
  const { id } = req.params;
  const deletedCoach = await coachModel.findByIdAndDelete(id);
  if (!deletedCoach) {
    return res.error(notFoundMessage("Coach"), 404);
  }
  return res.success({ deletedCoach }, deletedSuccessfullyMessage("Coach"), 200);
}