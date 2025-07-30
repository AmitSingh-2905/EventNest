import 'dotenv/config'
import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    college: { type: mongoose.Types.ObjectId, required: true, ref: "College" }
})
export const UserModel = model("User", UserSchema)

const AdminSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    college: { type: mongoose.Types.ObjectId, required: true, ref: "College" },
    society: { type: mongoose.Types.ObjectId, required: true, ref: "Society" }
})
export const AdminModel = model("Admin", AdminSchema)

const CollegeSchema = new Schema({
    name: { type: String, required: true, unique: true }
})
export const CollegeModel = model("College", CollegeSchema)

const SocietySchema = new Schema({
    name: { type: String, required: true, unique: true },
    college: { type: mongoose.Types.ObjectId, required: true, ref: "College" }
})
export const SocietyModel = model("Society", SocietySchema)

const EventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    date: {
        type: {
            D: { type: Number, required: true },
            M: { type: Number, required: true },
            Y: { type: Number, required: true }
        },
        required: true
    },
    event_URL: { type: String, required: true },
    college: { type: mongoose.Types.ObjectId, required: true, ref: "College" },
    admin: { type: mongoose.Types.ObjectId, required: true, ref: "Admin" },
    society: { type: String, required: true }
})
export const EventModel = model("Event", EventSchema)

const ModeratorSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    secret_key: { type: String, required: true }
})
export const ModeratorModel = model("Moderator", ModeratorSchema)

const RequestSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    college: { type: String, required: true },
    society: { type: String, required: true },
    identity_proof: { type: String, required: true }   
})
export const RequestModel = model("Request", RequestSchema) 