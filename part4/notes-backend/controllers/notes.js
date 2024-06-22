const notesRouter = require("express").Router()
const Note = require("../models/note")

notesRouter.get('/', (req, res) => {
  Note.find({}).then(notes => res.json(notes))
})

notesRouter.get('/:id', (req, res, next) => {
  Note
    .findById(req.params.id)
    .then(note => {
      if(!note) return res.status(404).end()
      res.json(note)
    })
    .catch(err => next(err))
})

notesRouter.post('/', (req, res, next) => {
  const { body } = req

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false
  })

  note.save()
    .then(savedNote => res.json(savedNote))
    .catch(err => next(err))
})

notesRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Note
    .findByIdAndDelete(id)
    .then(res =>  res.status(204).end())
    .catch(err => next(err))
})

notesRouter.put('/:id', (req, res, next) => {
  const id = req.params.id
  const { content, important } = req.body

  Note
    .findByIdAndUpdate(id, { content, important }, { new: true, runValidators: true, context: "query" })
    .then(updatedNote => res.json(updatedNote))
    .catch(err => next(err))
})

module.exports = notesRouter
