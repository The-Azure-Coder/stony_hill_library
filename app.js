var express = require('express')
const layout = require('express-ejs-layouts')
var app = express()
var path = require('path')
var cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(layout)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/images', express.static('images'))

app.use(cookieParser());
app.use(session({
    secret: 'secREt$#code$%3245',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1200000 }
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')



var indexRouter = require('./routes/home')
var loginRouter = require('./routes/login')
var booklistRouter = require('./routes/booklist')
var adminRouter = require('./routes/admin')

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/admin', adminRouter)
app.use('/booklist', booklistRouter)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening to http://localhost:${port}`)

})
