import express from "express"
import jwt from "jsonwebtoken"
import cors from "cors"
import bcrypt from "bcryptjs"
import mongoose from 'mongoose'
import ShortUniqueId from 'short-unique-id'
import { UserModel, AdminModel, CollegeModel, SocietyModel, EventModel, RequestModel, ModeratorModel } from './db'
import validateFormatMiddleware from "./middlewares/validateFormatMiddleware"
import checkUserCredsMiddleware from './middlewares/checkUserCredsMiddleware'
import checkAdminCredsMiddleware from './middlewares/checkAdminCredsMiddleware'
import checkModeratorCredsMiddleware from "./middlewares/checkModeratorCredsMiddleware"
import validateEventMiddleware from "./middlewares/validateEventMiddleware"
import authMiddleware from './middlewares/authMiddleware'
import { PORT, ADMIN_JWT_SECRET, USER_JWT_SECRET, MONGO_URL, MODERATOR_JWT_SECRET, SUPER_ADMIN_ID, WEBSITE_MAIL } from './config'  // replace MONGO_URL with mongo cloud instance before deployment
import { sendServerError } from "./utils/serverError"
import { sendMail } from "./utils/mailService"

const app = express()
const uid = new ShortUniqueId({ length: 8 })

app.use(express.json())
app.use(cors())

// user
app.post("/api/v1/user/signup", validateFormatMiddleware, async (req, res) => {
    const { firstname, lastname, email, password, college } = req.body
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            res.status(409).json({
                message: "user already exists"
            })
            return
        }
        const foundCollege = await CollegeModel.findOne({ name: college })
        if (!foundCollege) {
            res.status(404).json({
                message: "no college found"
            })
            return
        }
        const hashedPassword = await bcrypt.hash(password, 6)
        await UserModel.create({ firstname, lastname, email, password: hashedPassword, college: foundCollege._id })
        res.status(200).json({
            message: "user signed up"
        })
    } catch (err) {
        sendServerError(res)
    }
})

app.post("/api/v1/user/signin", checkUserCredsMiddleware, async (req, res) => {
    try {
        const token = jwt.sign({ id: req.headers.userId }, USER_JWT_SECRET)
        res.status(200).json({
            token,
            message: "user successfully signed in"
        })
    } catch (err) {
        sendServerError(res)
    }
})

// admin 
app.post("/api/v1/admin/signup", validateFormatMiddleware, async (req, res) => {
    const { firstname, lastname, email, password, college, society, identity_proof } = req.body
    try {

        const admin = await AdminModel.find({ email })
        if (admin.length > 0) {
            res.status(409).json({
                message: "admin already exists"
            })
            return
        }

        const pending = await RequestModel.find({ email })
        if (pending.length > 0) {
            res.status(400).json({
                message: "You have already applied for admin role"
            })
            return
        }
        // check if admin of that college's society already exists 
        const foundCollege = await CollegeModel.findOne({ name: college })
        if (foundCollege) {
            const collegeId = foundCollege._id
            const foundSociety = await SocietyModel.findOne({ college: collegeId })
            if (foundSociety?.name === society) {
                res.status(409).json({
                    message: "Admin of this society already exists",
                })
                return
            }
        }

        const hashedPassword = await bcrypt.hash(password, 6)
        await RequestModel.create({ firstname, lastname, email, password: hashedPassword, college, society, identity_proof })
        res.status(200).json({
            message: "Thanks for applying. You will be notified after the evaluation is complete"
        })
        return
    } catch (err) {
        sendServerError(res)
    }
})

app.post("/api/v1/admin/signin", checkAdminCredsMiddleware, async (req, res) => {
    try {
        const token = jwt.sign({ id: req.headers.adminId }, ADMIN_JWT_SECRET)
        res.status(200).json({
            token,
            message: "admin successfully signed in"
        })
    } catch (err) {
        sendServerError(res)
    }
})

// events for user & admin 
app.get("/api/v1/events", authMiddleware, async (req, res) => {
    const _id = req.Id
    const type = req.headers.type
    try {
        let collegeId: mongoose.Types.ObjectId | undefined
        if (type === "admin") {
            const admin = await AdminModel.findOne({ _id })
            collegeId = admin?.college as mongoose.Types.ObjectId
        } else if (type === "user") {
            const user = await UserModel.findOne({ _id })
            collegeId = user?.college as mongoose.Types.ObjectId
        } else {
            res.status(400).json({
                message: "Wrong payload"
            })
            return
        }
        const events = await EventModel.find({ college: collegeId }).select("name description society status date event_URL")
        res.status(200).json({
            message: "all events fetched",
            events
        })
    } catch (err) {
        sendServerError(res)
    }
})

// admin control 
app.get("/api/v1/admin/events", authMiddleware, async (req, res) => {
    const _id = req.Id
    try {
        const admin = await AdminModel.findOne({ _id })
        if (!admin) {
            res.status(404).json({
                message: "admin not found"
            })
            return
        }
        const adminEvents = await EventModel.find({ admin: admin?._id }).select("name description society status date event_URL")
        res.status(200).json({
            adminEvents
        })
    } catch (err) {
        sendServerError(res)
    }
})

app.post("/api/v1/admin/events", authMiddleware, validateEventMiddleware, async (req, res) => {
    const { name, description, status, date, event_URL } = req.body
    const _id = req.Id
    try {
        const admin = await AdminModel.findOne({ _id })
        const society = await SocietyModel.findOne({ _id: admin?.society })
        await EventModel.create({ name, description, status, date, event_URL, college: admin?.college, admin: admin?._id, society: society?.name })
        res.status(200).json({
            message: "new event added successfully"
        })
        return
    } catch (err) { 
        sendServerError(res)
    }
})

app.put("/api/v1/admin/events/:id", authMiddleware, validateEventMiddleware, async (req, res) => {
    const { name, description, status, date, event_URL } = req.body
    const _id = req.params.id
    try {
        let code = 404, msg = "requested event to update was not found"
        const event = await EventModel.findByIdAndUpdate({ _id }, { name, description, status, date, event_URL })
        if (event) {
            code = 200, msg = "event updated successfully"
            console.log(event)
        }
        res.status(code).json({
            message: msg
        })
    } catch (err) {
        sendServerError(res)
    }
})

app.delete("/api/v1/admin/events/:id", authMiddleware, async (req, res) => {
    const _id = req.params.id
    try {
        let code: number = 404, msg: string = "requested event to delete was not found"
        const event = await EventModel.findByIdAndDelete(_id)
        if (event) {
            code = 200, msg = `${event.name} event deleted successfully`
        }
        res.status(code).json({
            message: msg
        })
    } catch (err) {
        sendServerError(res)
    }
})

// moderator 
app.post("/api/v1/moderator/signin", checkModeratorCredsMiddleware, async (req, res) => {
    try {
        const token = jwt.sign({ id: req.headers.modId }, MODERATOR_JWT_SECRET)
        res.status(200).json({
            token,
            message: "moderator successfully signed in"
        })
    } catch (err) {
        sendServerError(res)
    }
})

app.get("/api/v1/moderator/requests", authMiddleware, async (req, res) => {
    try {
        const requests = await RequestModel.find().select("firstname lastname email college society identity_proof")
        res.status(200).json({
            requests
        })
    } catch (err) {
        sendServerError(res)
    }
})

app.put("/api/v1/moderator/requests/manage/:id", authMiddleware, async (req, res) => {
    const { action } = req.body // approve / reject 
    const _id = req.params.id
    try {
        if (action !== "approve" && action !== "reject") {
            res.status(400).json({
                message: "action field has wrong payload"
            })
            return
        }
        const request = await RequestModel.findByIdAndDelete(_id)
        if (!request) {
            res.status(404).json({
                message: "Request id not found"
            })
            return
        }
        const { firstname, lastname, email, password, college, society } = request // password is already hashed 

        if (action === "reject") {
            const { success, message } = await sendMail(
                WEBSITE_MAIL,
                email,
                "Update on Your Application for the Admin Position",
                `Thank you for your interest in applying for the Admin position for ${society} society at ${college}. After careful consideration, we regret to inform you that your application has been rejected`
            )
        } else if (action === "approve") {
            let collegeId: mongoose.Types.ObjectId
            const foundCollege = await CollegeModel.findOne({ name: college })
            if (!foundCollege) {
                const newCollege = await CollegeModel.create({ name: college })
                collegeId = newCollege._id
            } else {
                collegeId = foundCollege._id
            }
            // NOTE-> one society, one admin. So u can never find an exisiting society. chcked in admin signup endpoint 
            const newSociety = await SocietyModel.create({ name: society, college: collegeId })
            await AdminModel.create({ firstname, lastname, email, password, college: collegeId, society: newSociety._id })
            const { success, message } = await sendMail(
                WEBSITE_MAIL,
                email,
                "Admin Access Approved",
                "We are pleased to inform you that your request for the Admin position has been approved. You can now log in with your registered email and password."
            )
        }
        res.status(200).json({
            message: "request successfuly managed"
        })
        return
    } catch (err) {
        sendServerError(res)
    }
})

// only for super admin
app.get("/api/v1/super-admin/moderators", authMiddleware, async (req, res) => {
    const _id = req.Id
    if (_id !== SUPER_ADMIN_ID) {
        res.status(403).json({
            message: "permission denied, access only restricted to super admin"
        })
        return
    }
    try {
        const mods = await ModeratorModel.find().select("firstname lastname email")
        res.status(200).json({
            mods
        })
    } catch (err) {
        sendServerError(res)
    }
})

app.post("/api/v1/super-admin/moderators", authMiddleware, async (req, res) => {
    const _id = req.Id
    if (_id !== SUPER_ADMIN_ID) {
        res.status(403).json({
            message: "permission denied, access only restricted to super admin"
        })
        return
    }
    const { firstname, lastname, email } = req.body
    try {
        const mod = await ModeratorModel.find({ email })
        if (mod.length > 0) {
            res.status(409).json({
                message: "moderator already exists"
            })
            return
        }
        const secretKey = uid.rnd()
        const hashedSecretKey = await bcrypt.hash(secretKey, 6)
        await ModeratorModel.create({ firstname, lastname, email, secret_key: hashedSecretKey })
        // mail the mod giving his/her secret key
        const { success, message } = await sendMail(
            WEBSITE_MAIL,
            email,
            "Moderator Access Granted",
            `I am pleased to inform you that you have been granted moderator access. You can now log in using your registered email address along with the secret key ${secretKey}`
        );
        res.status(200).json({
            message: "moderator successfully added"
        })
    } catch (err) {
        sendServerError(res)
    }
})

app.delete("/api/v1/super-admin/moderators/:id", authMiddleware, async (req, res) => {
    const _id = req.params.id
    try {
        let code: number = 404, msg: string = "requested moderator to remove was not found"
        const mod = await ModeratorModel.findByIdAndDelete(_id)
        if (mod) {
            code = 200, msg = `${mod.email} removed successfully`
        }
        res.status(code).json({
            message: msg,
            mod: `${mod}`
        })
    } catch (err) {
        sendServerError(res)
    }
})

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to database")
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}...`)
        })
        server.on('error', (err) => {
            console.error("Server failed to start:", err)
        })
    } catch (err) {
        console.error("Connection to DB failed:", err)
    }
}

main()