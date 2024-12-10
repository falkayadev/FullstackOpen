import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import Person from './models/person.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 3001
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  console.log(err.name)
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  next(err)
}
app.get('/api/people', (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.json(people)
    })
    .catch((err) => next(err))
})

app.get('/api/people/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).json({ error: 'Not found!' })
      }
    })
    .catch((err) => next(err))
})

app.get('/api/info', (req, res, next) => {
  let quantity
  Person.find({})
    .then((result) => {
      quantity = result.length
      const content = `Phonebook has info for ${quantity} people <br/> ${new Date()}`
      res.send(content)
    })
    .catch((err) => next(err))
})

app.post('/api/people', (req, res, next) => {
  const body = req.body

  const person = new Person({ name: body.name, number: body.number })

  person
    .save({ runValidators: true })
    .then((savedPerson) => {
      res.status(201).json(savedPerson)
    })
    .catch((err) => next(err))
})

app.put('/api/people/:id', async (req, res, next) => {
  const { name, number } = req.body
  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      console.log(updatedPerson)
      res.json(updatedPerson)
    })
    .catch((err) => next(err))
})

app.delete('/api/people/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result)
      res.status(204).json(result)
    })
    .catch((err) => next(err))
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is listening on ${port} port`)
})
