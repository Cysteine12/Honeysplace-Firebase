// const functions = require('firebase-functions');

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

//=======Middleware======//
app.use(bodyParser.json())
app.use(cors())

//=======Routes========//
const product = require('./functions/routes/api/product')
app.use('/api', product)

app.use('/', (req, res) => {
    res.status(200)
    res.send('Hi, This is still working')
})

//=======........========//

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/functions/public/'))

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/functions/public/index.html'))
}


//=======........========//
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))

// exports.app = functions.https.onRequest(app);