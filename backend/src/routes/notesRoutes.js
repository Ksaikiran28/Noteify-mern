import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote ,getNoteById} from "../controllers/notesControllers.js";
import ratelimiter from "../middleware/rateLimiter.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllNotes);
router.get("/:id", protect,getNoteById);
router.post("/", protect,ratelimiter,createNote);
router.put("/:id", protect,ratelimiter,updateNote);
router.delete("/:id", protect,ratelimiter,deleteNote);


export default router;