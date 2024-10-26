import nodemailer from "nodemailer";
import { emialTemplate } from "./EmailTemplate.js"; // Adjust the import path according to your project structure

const sendEmail = async (username, to, verificationUrl) => {
    if (!to) {
        throw new Error("No recipient email address provided");
    }

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD, // Use your app password here
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const emailContent = emialTemplate(username, verificationUrl); // Adjust according to your template function

    try {
        let info = await transporter.sendMail({
            from: process.env.EMAIL, // Sender address
            to, // Recipient's email
            subject: "Please verify your email",
            html: emailContent,
        });

        console.log("Email sent successfully: ", info.messageId);
    } catch (error) {
        console.error("Error sending email: ", error);
        throw new Error("Could not send email");
    }
};

export default sendEmail;

