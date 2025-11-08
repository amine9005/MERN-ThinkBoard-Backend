import Note from "../models/Note.js";

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in get all notes", error);
    res.status(500).json({ message: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) return res.status(404).send("Note not found");
    res.status(200).json(note);
  } catch (error) {
    console.log("Error in get note", error);
    res.status(500).json({ message: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error in create note", error);
    res.status(500).json({ message: error.message });
  }
};

// const updateNote = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, content } = req.body;
//     const note = await Note.findById(id);
//     note.title = title;
//     note.content = content;
//     const updatedNote = await note.save();
//     res.status(200).json(updatedNote);
//   } catch (error) {
//     console.log("error ", error);
//     res.status(500).json({ message: error.message });
//   }
// };

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    // console.log("note is: ", note);
    if (!note)
      return res.status(404).send("Note not found new one has been created!");

    res.status(200).json(note);
  } catch (error) {
    console.log("Unable to update note", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    if (!note) return res.status(404).send("Note not found");
    res.status(200).send("Note deleted successfully");
  } catch (error) {
    console.log("Unable to delete note", error);
    res.status(500).json({ message: error.message });
  }
};

const pageNotFound = (req, res) => {
  res.status(404).send("Page not found");
};

export default {
  getAllNotes,
  createNote,
  pageNotFound,
  getNoteById,
  updateNote,
  deleteNote,
};
