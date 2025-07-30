import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs"
import { z } from "zod"
import { AdminModel } from "../db";

async function checkAdminCredsMiddleware(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
        const reqBody = z.object({
            email: z.string().min(3, "Email is too short").max(50, "Email is too long").email("Invalid email"),
            password: z.string()
        })
        const parsedData = reqBody.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({
                message: `Incorrect format. ${parsedData.error.issues[0].message}`,
            });
            return;
        }
        const foundAdmin = await AdminModel.findOne({ email })
        if (!foundAdmin) {
            res.status(403).json({
                message: "Please sign up first"
            })
            return
        }
        const isPasswordCorrect = await bcrypt.compare(password, foundAdmin.password)
        if (!isPasswordCorrect) {
            res.status(401).json({
                message: "wrong password"
            })
        } else {
            req.headers.adminId = foundAdmin._id.toString()
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: "Could not sign in admin. Server error"
        })
    }
}
export default checkAdminCredsMiddleware