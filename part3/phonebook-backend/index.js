const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token("body", (req, _) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method)
  console.log("Path:", req.path)
  console.log("Body:", req.body)
  console.log("---")
  next()
}

app.use(requestLogger)

app.get('/api/persons', (req, res, next) => {
  Person
    .find({})
    .then(persons => res.json(persons))
    .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person
    .find({ id })
    .then(persons => {
      if(persons.length === 0) return res.status(404).send("Person not found")
      res.json(persons)
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const { name, number } = req.body
  if(!name || !number) return res.status(400).json({ error: "name or number missing" })

  Person
    .findByIdAndUpdate(id, { name, number }, { new: true })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

app.post('/api/persons', async (req, res) => {
  const { name, number } = req.body

  if(!name || !number) return res.status(400).json({ error: "name or number missing" })

  const phonebook = await Person.find({ name })

  if(phonebook.length !== 0) return res.status(400).json({ error: "name must be unique" })

  const person = new Person({ name, number })

  await person.save()

  res.status(201).json(person)
})

app.get("/info", (req, res) => {
  let msg = `<p>Phonebook has info for ${Person.estimatedDocumentCount()} people</p>`
  msg += `<p>${new Date()}</p>`
  res.send(msg)
})

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if(err.name === 'CastError') return res.status(400).send({ error: 'malformatted id' })
  next(err)
}

app.use(errorHandler)

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})