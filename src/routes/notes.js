const express = require('express')
const NoteController = require('../controllers/note.controller')

const router = express.Router()

router.get('/', async (req,res) => {

    let allNotes = await NoteController.findAllNotes().sort({created_at: 'desc'})

    res.render("notes/all-notes", { successMessage: req.flash('success'), allNotes})

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

        req.flash('success', 'Nota Creada exitosamente')

        res.redirect('/notes')
    }
    
    
})

router.get('/edit/:id', async (req,res) => {

    let id = req.params.id

    let note = await NoteController.findNoteById(id)
    
   
    res.render('notes/edit-note', {note})
    
})

router.put('/edit/:id', async (req,res) => {

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

        req.flash('success', 'Nota Editada exitosamente')
        res.redirect('/notes')
    }

})

router.delete('/delete/:id', async (req,res) => {

    let id = req.params.id
    
    let note = await NoteController.removeNote(id)

    req.flash('success', 'Nota Borrada exitosamente')

    res.redirect('/notes')
})

module.exports = router