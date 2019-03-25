const app = require('./app')

require('./database')
app.listen(app.get('port'), () =>{
    console.log('server run on' + app.get('port'))
})