import { Response } from "express";

export function sendServerError(res: Response) {
    return res.status(500).json({
        message: "server error"
    })
}