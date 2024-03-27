import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const handleInputName = (e) => {
        setNewName(e.target.value)
    }

    const handleInputNumber = (e) => {
        setNewNumber(e.target.value)
    }

    const handleFilter = (e) => {
        setFilter(e.target.value)
    }

    const handleForm = (e) => {
        e.preventDefault()
        if (persons.find(({name}) => name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1}))
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <div>
                filter shown with <input onChange={handleFilter}/>
            </div>
            <h2>Add a new</h2>
            <form onSubmit={handleForm} style={{display: "flex", flexFlow: "column", gap: "1rem"}}>
                <div>
                    name: <input onChange={handleInputName} value={newName} />
                </div>
                <div>
                    number: <input onChange={handleInputNumber} value={newNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {
                persons
                    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(person => <p key={person.id}>{person.name}: {person.number}</p>)
            }
        </div>
    )
}

export default App