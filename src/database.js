const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/app-users-separated', {useNewUrlParser: true})
    .then( db => console.log('db connected'))
    .catch(err => console.log(err))