import mongoose from "mongoose";
import {noteSchema} from "../models/Note.js"

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    notes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    }]
})

const User = mongoose.model("User", UserSchema)

export default User;