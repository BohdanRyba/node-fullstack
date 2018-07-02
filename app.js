const express = require('express')
const bodyparser = require('body-parser')
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const analiticsRoutes = require('./routes/analitics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const passport = require("passport")
const app = express();

const dbString = 'mongodb://root:24049898b@ds125241.mlab.com:25241/boost-service'
mongoose.connect(dbString)
  .then(() => {
    console.log('connecting to mlab database SUCCESSFULLY')
  })
  .catch(err => {
    console.log(err)
  })

app.use(passport.initialize())

require('./middleware/passport')(passport) //подключает и сразу же вызывает

//morgan
app.use(morgan('dev'))
//--morgan

//morgan
app.use(cors())
//--morgan

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())


app.use('/api/auth', authRoutes)
app.use('/api/analitics', analiticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app;