const Note = require('../models/note');

// Get notes by userId
const getNotesByUser = async (req, res, next) => {
    try {
        const notes = await Note.find({ user: req.auth._id });
        res.status(200).send(notes);
    } catch (err) {
        res.status(500);
        next(err);
    }
};

// Add new note
const addNote = async (req, res, next) => {
    try {
        req.body.user = req.auth._id;
        req.body.username = req.auth.username;

        const newNote = new Note(req.body);
        const savedNote = await newNote.save();
        res.status(201).send(savedNote);
    } catch (err) {
        res.status(500);
        next(err);
    }
};

// Delete note
const deleteNote = async (req, res, next) => {
    try {
        const deletedNote = await Note.findOneAndDelete({
            _id: req.params.noteId,
            user: req.auth._id
        });
        if (!deletedNote) {
            return res.status(404).send("Note not found");
        }
        res.status(200).send(`Successfully Deleted Note: ${deletedNote.title}`);
    } catch (err) {
        res.status(500);
        next(err);
    }
};

// Edit note
const editNote = async (req, res, next) => {
    try {
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.noteId, user: req.auth._id },
            req.body,
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).send("Note not found");
        }
        res.status(201).send(updatedNote);
    } catch (err) {
        res.status(500);
        next(err);
    }
};

module.exports = {
    getNotesByUser,
    addNote,
    deleteNote,
    editNote
};
