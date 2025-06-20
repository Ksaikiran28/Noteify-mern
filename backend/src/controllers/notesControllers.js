import Note from "../models/Note.js";
import User from "../models/Users.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      createdAt: -1,
    }); //newest created one will get first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    // 1. Create and save the note
    const note = new Note({ title, content, user: req.user.id });
    const savedNote = await note.save();

    // 2. Push the note ID to user's notes array
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { notes: savedNote._id } },
      { new: true }
    );
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content },
      { new: true }
    );

    
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { notes: req.params.id },
      },
      {
        new: true,
      }
    );
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deletedNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
