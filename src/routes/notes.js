const express = require('express')
const NoteController = require('../controllers/note.controller')

const router = express.Router()

router.get('/', async (req,res) => {

    let allNotes = await NoteController.findAllNotes().sort({created_at: 'desc'})

    res.render("notes/all-notes", {allNotes})

})

router.get('/add', (req,res) => {
    res.render("notes/new-note")
})

router.post('/add', async (req,res) => {

    let title = req.body.title
    let description = req.body.description

    let errors = []

    if(!title){
        errors.push('introduzca un titulo')
    }
    
    if(!description){
        errors.push('introduzca una descripción')
    }

    if(errors.length > 0){
        res.render("notes/new-note", {errors})
        console.log(errors)
    }else{

        const note = {
            title,
            description
        }

        await NoteController.newNote(note)

        res.redirect('/notes')
    }
    
    
})

router.get('/edit/:id', async (req,res) => {

    let id = req.params.id

    let note = await NoteController.findNoteById(id)
    
    res.render('notes/edit-note', {note})
    
})

router.post('/edit/:id', async (req,res) => {

    let id = req.params.id
    
    let note = await NoteController.findNoteById(id)

    let title = req.body.title
    let description = req.body.description

    let errors = []

    if(!title){
        errors.push('introduzca un titulo')
    }
    
    if(!description){
        errors.push('introduzca una descripción')
    }

    if(errors.length > 0){
        res.render("notes/edit-note", {errors, note})
    }else{

        const data = {
            title,
            description
        }

        await NoteController.updateNote(id, data)

        res.redirect('/notes')
    }

})

router.get('/delete/:id', async (req,res) => {

    let id = req.params.id
    
    let note = await NoteController.removeNote(id)
    
    res.redirect('/notes')
})

module.exports = router