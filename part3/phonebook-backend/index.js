const express = require('express')
const app = express()

app.use(express.json())

let phonebook = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(phonebook)
})

app.get('/api/persons/:id', (req, res) => {
  const person = phonebook.find(p => p.id === Number(req.params.id))
  if(!person) return res.status(404).send("Person not found")
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  phonebook = phonebook.filter(p => p.id !== Number(req.params.id))

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if(!name || !number) return res.status(400).json({ error: "name or number missing" })
  if(phonebook.find(p => p.name === name)) return res.status(400).json({ error: "name must be unique" })

  phonebook = phonebook.concat({ id: Math.floor(Math.random() * 10000), name, number })

  res.status(201).json(phonebook)
})

app.get("/info", (req, res) => {
  let msg = `<p>Phonebook has info for ${phonebook.length} people</p>`
  msg += `<p>${new Date()}</p>`
  res.send(msg)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})