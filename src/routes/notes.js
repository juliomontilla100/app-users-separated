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

module.exports = router