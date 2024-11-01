import nodemailer from "nodemailer";
import { emialTemplate } from "./EmailTemplate.js"; // Adjust the import path as needed

const sendEmail = async (username, to, verificationUrl) => {
    if (!to) {
        throw new Error("No recipient email address provided");
    }

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD, 
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const emailContent = emialTemplate(username, verificationUrl); 

    try {
        let info = await transporter.sendMail({
            from: process.env.EMAIL,
            to, 
            subject: "Please verify your email",
            html: emailContent,
        });
        
    } catch (error) {
        throw new Error("Could not send email");
    }
};

export default sendEmail;
