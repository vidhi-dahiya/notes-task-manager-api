const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const protect = require('../middleware/auth'); // Imports your middleware

// Create a new note (POST) & Read all user notes (GET)
router.route('/')
  .post(protect, async (req, res) => {
    try {
      const { title, content } = req.body;
      const newNote = new Note({ user: req.user.userId, title, content });
      await newNote.save();
      res.status(201).json(newNote);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .get(protect, async (req, res) => {
    try {
      const notes = await Note.find({ user: req.user.userId });
      res.json(notes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Update (PUT) & Delete (DELETE) notes by ID
router.route('/:id')
  .put(protect, async (req, res) => {
    try {
      const { title, content } = req.body;
      let note = await Note.findById(req.params.id);
      if (!note) return res.status(404).json({ message: 'Note not found' });
      if (note.user.toString() !== req.user.userId) return res.status(401).json({ message: 'Unauthorized action' });

      note = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
      res.json(note);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .delete(protect, async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (!note) return res.status(404).json({ message: 'Note not found' });
      if (note.user.toString() !== req.user.userId) return res.status(401).json({ message: 'Unauthorized action' });

      await note.deleteOne();
      res.json({ message: 'Note successfully deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
