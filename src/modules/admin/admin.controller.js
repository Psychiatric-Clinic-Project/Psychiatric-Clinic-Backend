import bcrypt from "bcryptjs";
import { SUCCESS_MESSAGE} from "../../constant.js";
import { uploadFile } from "../../services/uploadFile.js";
import { adminModel } from "../../../Database/models/admin.model.js";

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
  