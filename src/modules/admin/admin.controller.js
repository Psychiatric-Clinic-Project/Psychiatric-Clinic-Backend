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
import { userModel } from "../../../database/models/user.model.js";
import { advisorModel } from "../../../database/models/advisor.model.js";

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
  return res.success(admin, createdSuccessfullyMessage("Admin"), 201);
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
  return res.success(newArticle, createdSuccessfullyMessage("Article"), 201);

};

export const getArticles = async (req, res) => {
  const articles = await articleModel.find();
  return res.success(
    articles ,
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
  return res.success(article , retrievedSuccessfullyMessage("Article"), 200);
};

export const deleteArticle = async (req, res) => {
  const deletedArticle = await articleModel.findOneAndDelete(req.params.id);
  if (!deletedArticle) {
    return res.error(notFoundMessage("article"), 404);
  }
  return res.success(
    deleteArticle,
    deletedSuccessfullyMessage("Article"),
    200
  );
};

export const updateAdvisor = async (req, res) => {
  const updates = req.body;

  const updatedAdvisor = await advisorModel.findByIdAndUpdate(req.params.id, updates, { new: true });
  if (!updatedAdvisor) {
    return res.error(notFoundMessage("Advisor"), 404);
  }
  return res.success(updatedAdvisor ,updatedSuccessfullyMessage("Advisor"),200);
}

export const getAdvisors = async (req, res) => {
  const advisors = await advisorModel.find();
  return res.success( advisors , retrievedSuccessfullyMessage("Advisors"), 200);
}

export const deleteAdvisor = async (req, res) => {
  const { id } = req.params;
  const deletedAdvisor = await advisorModel.findByIdAndDelete(id);
  if (!deletedAdvisor) {
    return res.error(notFoundMessage("Advisor"), 404);
  }
  return res.success( deletedAdvisor , deletedSuccessfullyMessage("Advisor"), 200);
}

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedUser = await userModel.findByIdAndUpdate(id, updates, { new: true });
  if (!updatedUser) {
    return res.error(notFoundMessage("User"), 404);
  }
  return res.success(updatedUser,updatedSuccessfullyMessage("User"),200);
}

export const getUsers = async (req, res) => {
  const users = await userModel.find();
  return res.success(users, retrievedSuccessfullyMessage("Users"), 200);
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await userModel.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.error(notFoundMessage("User"), 404);
  }
  return res.success(deletedUser, deletedSuccessfullyMessage("User"), 200);
}