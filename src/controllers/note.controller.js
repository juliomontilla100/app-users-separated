const Note = require('../models/note.model')

const findAllNotes = () => {
    return Note.find({})
}

const newNote = (note) => {
    return new Note(note).save()
}

module.exports = {
    newNote,
    findAllNotes
}
