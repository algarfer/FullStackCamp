const express = require('express')
const app = express()
const cors = require('cors')

const Note = require('./models/note')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => res.json(notes))
})

app.post('/api/notes', (req, res, next) => {
  const { body } = req

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false
  })

  note.save()
    .then(savedNote => res.json(savedNote))
    .catch(err => next(err))
})

app.get('/api/notes/:id', (req, res, next) => {
  Note
    .findById(req.params.id)
    .then(note => {
      if(!note) return res.status(404).end()
      res.json(note)
    })
    .catch(err => next(err))
})

app.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  Note
    .findByIdAndDelete(id)
    .then(res =>  res.status(204).end())
    .catch(err => next(err))
})

app.put('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const { content, important } = req.body

  Note
    .findByIdAndUpdate(id, { content, important }, { new: true, runValidators: true, context: "query" })
    .then(updatedNote => res.json(updatedNote))
    .catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if(err.name === 'CastError') return res.status(400).send({ error: 'malformatted id' })
  if(err.name === 'ValidationError') return res.status(400).json({ error: err.message })
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
