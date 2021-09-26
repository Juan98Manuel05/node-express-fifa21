const express = require('express')
const app = express()
const morgan = require('morgan')

// settings
app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2)

// middleware
app.use(express.json())
app.use(morgan('dev'))

// app.use(express.static('public'));
app.use('/', express.static(__dirname + '/public'));

    
// routes
app.use('/api/v1/saveplayers',require('./routes/saveplayers'))

app.use('/api/v1', require('./routes/players'))
app.use('/api/v1', require('./routes/team'))

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})