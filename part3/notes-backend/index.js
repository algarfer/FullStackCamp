const express = require('express')
const {response} = require("express");
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(note => note.id))
    : 0
  return maxId + 1
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.post('/api/notes', (req, res) => {
  const { body } = req
  if(!body.content) return res.status(400).json({ error: "content missing" })

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId()
  }

  notes = notes.concat(note)

  res.json(note)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if(!note) return res.status(404).json("Note not found")
  res.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

app.put('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const { body } = req

  let n

  notes = notes.map(note => {
    if(note.id !== id) return note

    let important = body.important
    if(`${important}` === "true" || `${important}` === "false") important = Boolean(important)
    else important = note.important

    n = {
      content: body.content || note.content,
      important,
      id: note.id
    }

    return n
  })

  res.status(200).json(n)
})

const PORT = process.env.port || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
