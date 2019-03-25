const Note = require('../models/note.model')

const findAllNotes = () => {
    return Note.find({})
}

const findNoteById = id => {
    return Note.findById(id)
} 

const newNote = note => {
    return new Note(note).save()
}

const updateNote = (id, note) => {
    return Note.findOneAndUpdate({_id: id}, note)
}

const removeNote = id => {
    return Note.findByIdAndDelete(id)
} 

module.exports = {
    newNote,
    findAllNotes,
    findNoteById,
    updateNote,
    removeNote
}
