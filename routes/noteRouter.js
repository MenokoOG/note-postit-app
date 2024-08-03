const express = require('express');
const noteRouter = express.Router();
const noteController = require('../controllers/noteController');

// Get notes by userId
noteRouter.get('/user', noteController.getNotesByUser);

// Add new note
noteRouter.post('/', noteController.addNote);

// Delete note
noteRouter.delete('/:noteId', noteController.deleteNote);

// Edit note
noteRouter.put('/:noteId', noteController.editNote);

module.exports = noteRouter;
