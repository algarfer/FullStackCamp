import { useState, useEffect } from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const handleInputName = (e) => setNewName(e.target.value)
    const handleInputNumber = (e) => setNewNumber(e.target.value)
    const handleFilter = (e) => setFilter(e.target.value)

    useEffect(() => {
        axios.get("http://localhost:3001/persons")
            .then(response => {
                setPersons(response.data)
            })
    }, []);

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