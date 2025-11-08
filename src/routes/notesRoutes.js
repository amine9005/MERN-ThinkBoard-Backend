import express from "express";
import notesController from "../controllers/notesController.js";

const router = express.Router();

router.get("/", notesController.getAllNotes);
router.get("/:id", notesController.getNoteById);
router.post("/", notesController.createNote);
router.put("/:id", notesController.updateNote);
router.delete("/:id", notesController.deleteNote);

router.get("/*", notesController.pageNotFound);

export default router;
