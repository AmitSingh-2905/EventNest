import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs"
import { z } from "zod"
import { UserModel } from "../db";

async function checkUserCredsMiddleware(req: Request, res: Response, next: NextFunction) {
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
        const foundUser = await UserModel.findOne({ email })
        if (!foundUser) {
            res.status(403).json({
                message: "Please sign up first"
            })
            return
        }
        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
        if (!isPasswordCorrect) {
            res.status(401).json({
                message: "wrong password"
            })
        } else {
            req.headers.userId = foundUser._id.toString()
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: "Could not sign in user. Server error"
        })
    }
}
export default checkUserCredsMiddleware