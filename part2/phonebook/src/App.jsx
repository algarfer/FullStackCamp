import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleInputName = (e) => {
        setNewName(e.target.value)
    }

    const handleInputNumber = (e) => {
        setNewNumber(e.target.value)
    }

    const handleForm = (e) => {
        e.preventDefault()
        if (persons.find(({name}) => name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        setPersons(persons.concat({ name: newName, number: newNumber }))
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
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
            {persons.map(person => <p key={person.name}>{person.name}: {person.number}</p>)}
        </div>
    )
}

export default App