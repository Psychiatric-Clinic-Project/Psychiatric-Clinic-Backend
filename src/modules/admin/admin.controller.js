import bcrypt from "bcryptjs";
import { SUCCESS_MESSAGE} from "../../constant.js";
import { uploadFile } from "../../services/uploadFile.js";
import { adminModel } from "../../../Database/models/admin.model.js";
import { articleModel } from "../../../Database/models/article.model.js";

export const adminSignUp = async (req, res, next) => {
    try {
      const { name, email, password} = req.body;
      const img = await uploadFile(req.file.path);
      
      const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));

      const admin = await adminModel.create({
        name,
        email,
        password: hash,
        img,
      });
  
       return res.status(201).json({ message: SUCCESS_MESSAGE, admin });
    } catch (err) {
      next(new Error(err.message, { cause: 400 }));
    }
  };

  export const addArticle = async (req, res, next) => {
    try {
      
      const { title, text,  category } = req.body;
      const img = await uploadFile(req.file.path);

  
      const newArticle = new articleModel({
        title,
        text,
        img,
        category,
      });
  
      await newArticle.save();
  
      return res.status(201).json({ message: "Article created successfully", newArticle });
    } catch (error) {
      return res.status(500).json({ message: "Failed to create article", error });
    }
  };


  export const getArticle = async (req, res, next) => {
    try {
      const articles = await articleModel.find(); 
  
      if (!articles || articles.length === 0) {
        return res.status(404).json({ message: "No articles found" });
      }
  
      return res.status(200).json(articles); 
    } catch (error) {
      return res.status(500).json({ message: "Error fetching articles", error });
    }
  };

  export const getArticleById = async (req, res, next) => {
    try {
      const { id } = req.params;
      
  
      const article = await articleModel.findById(id);
      console.log("test")
  
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
  
      return res.status(200).json(article);
    } catch (error) {
     return  res.status(500).json({ message: "Error retrieving article", error });
    }
  };

  export const deleteArticle = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Find the article by uniqueID and delete it
      const deletedArticle = await articleModel.findOneAndDelete(id);
  
      if (!deletedArticle) {
        return res.status(404).json({ message: "Article not found" });
      }
  
      res.status(200).json({ message: "Article deleted successfully", deletedArticle });
    } catch (error) {
      res.status(500).json({ message: "Error deleting article", error });
    }
  };

  
  
  
  
  