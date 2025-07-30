import nodemailer from "nodemailer"
import { MAIL_HOST, NODEMAILER_APP_PASSWORD, WEBSITE_MAIL } from "../config";
export const sendMail = async (from: string, to: string, subject: string, text: string, html?: string) => {
    try {
        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: html
        }
        const transporter = nodemailer.createTransport({
            service: MAIL_HOST,
            auth: {
                user: WEBSITE_MAIL,
                pass: NODEMAILER_APP_PASSWORD
            }
        })
        const info = await transporter.sendMail(mailOptions);
        return { success: true, message: "Mail successfully sent" }
    } catch (err) {
        return { success: false, message: `Mail not sent. ${err}` }
    }
}