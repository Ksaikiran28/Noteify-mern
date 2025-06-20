import express from "express"
import {Login, Signup, Logout} from "../controllers/authController.js"
import { protect } from "../middleware/authMiddleware.js"
import {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
  } from "../controllers/notesControllers.js"; 
  

const router = express.Router()

router.post("/login", Login)
router.post("/signup", Signup)
router.post("/logout", protect, Logout)
router.get("/notes", protect, getAllNotes)

export default router