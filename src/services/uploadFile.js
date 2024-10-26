import cloudinary from "./cloudinary.js"

export const uploadFile = async(file)=>{
    const {secure_url} = await cloudinary.uploader.upload(
        file,
        {
            folder:"psy_clinic"
        }
    );
    return secure_url;
}