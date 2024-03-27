import { useState } from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";

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

    const handleInputName = (e) => setNewName(e.target.value)
    const handleInputNumber = (e) => setNewNumber(e.target.value)
    const handleFilter = (e) => setFilter(e.target.value)

    const handleForm = (e) => {
        e.preventDefault()
        if (persons.find(({name}) => name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1}))
        setNewName('')
        setNewNumber('')
        setFilter('')
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter handler={handleFilter} filter={filter} />
            <h2>Add a new</h2>
            <PersonForm
                formHandler={handleForm}
                nameHandler={handleInputName}
                name={newName}
                numberHandler={handleInputNumber}
                number={newNumber}
            />
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} />
        </div>
    )
}

export default App