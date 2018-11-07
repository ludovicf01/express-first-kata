let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

// Moteur de templet
app.set('view engine', 'ejs')

// Middleware
app.use('/assets', express.static('public')) // Gestion des fichiers statiques
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())
app.use(session({
  secret: 'rfeiferifjeprifr',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


// Route
app.get('/', (request, response) => {
    if(request.session.error){
        response.locals.error = request.session.error
        request.session.error = undefined
    }
    response.render('pages/index')
})


app.post('/', (request, response) => {
    if(request.body.message === undefined || request.body.message === ''){
       request.session.error = "Il y a une erreur"
        response.redirect('/') 
    }
    console.log(request.body)
})


app.listen(8080)