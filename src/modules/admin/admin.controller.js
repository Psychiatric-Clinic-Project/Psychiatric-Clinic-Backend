import bcrypt from "bcryptjs";
import { SUCCESS_MESSAGE } from "../../constant.js";
import { uploadFile } from "../../services/uploadFile.js";
import { adminModel } from "../../../Database/models/admin.model.js";
import { articleModel } from "../../../Database/models/article.model.js";

export const adminSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const img = await uploadFile(req.file.path);

  const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));

  const admin = await adminModel.create({
    name,
    email,
    password: hash,
    img,
  });
  return res.status(201).json({ message: SUCCESS_MESSAGE, admin });
};

export const addArticle = async (req, res, next) => {
  const { title, text, category } = req.body;

  const img = await uploadFile(req.file.path);
  const newArticle = new articleModel({
    title,
    text,
    img,
    category,
  });
  await newArticle.save();

  return res
    .status(201)
    .json({ message: "Article created successfully", newArticle });
};

export const getArticle = async (req, res, next) => {
  const articles = await articleModel.find();

  if (!articles || articles.length === 0) {
    return res.status(404).json({ message: "No articles found" });
  }
  return res.status(200).json(articles);
};

export const getArticleById = async (req, res) => {
  const { id } = req.params;

  const article = await articleModel.findById(id);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  return res.status(200).json(article);
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  const deletedArticle = await articleModel.findOneAndDelete(id);

  if (!deletedArticle) {
    return res.status(404).json({ message: "Article not found" });
  }
  return res
    .status(200)
    .json({ message: "Article deleted successfully", deletedArticle });
};
