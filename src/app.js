const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.disable('x-powered-by')
app.use(bodyParser.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// How excactly does this line work? 
const cars = require('./routes/cars')
app.use('/cars', cars)

app.use((err, req, res, next) => {
  console.log(err)
  const status = err.status || 500
  res.status(status).json({ error: err })
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not Found' }})
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)

// module.exports = app

// What does this code mean???
// if (process.env.NODE_ENV !== 'development') {
//   const listener = () => console.log(`Santa is on ${port}`)
//   let server = app.listen(port, listener)
// }