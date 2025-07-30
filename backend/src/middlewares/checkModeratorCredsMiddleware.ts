import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs"
import { z } from "zod"
import { ModeratorModel } from "../db";
import { SUPER_ADMIN, SUPER_ADMIN_ID, SUPER_ADMIN_SECRET_KEY } from "../config";

async function checkModeratorCredsMiddleware( req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    // check for super admin 
    if(email === SUPER_ADMIN) {
        if(password !== SUPER_ADMIN_SECRET_KEY) {
            res.status(401).json({
                message: "wrong secret key"
            })
            return
        }
        req.headers.modId = SUPER_ADMIN_ID?.toString()
        return next()
    }

    try {
        // add zod validation 
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
        const foundMod = await ModeratorModel.findOne({ email })
        if(!foundMod) {
            res.status(403).json({
                message: "You are restricted"
            })
            return 
        }
        const isSecretKeyCorrect = await bcrypt.compare(password, foundMod.secret_key)
        if(!isSecretKeyCorrect) {
            res.status(401).json({
                message: "wrong secret key"
            })
        } else {
            req.headers.modId = foundMod._id.toString()
            next()
        }
    } catch(err) {
        res.status(500).json({
            message: "Could not sign in moderator. Server error"
        })
    }
}
export default checkModeratorCredsMiddleware