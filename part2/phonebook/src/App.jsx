import {useState, useEffect} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import contacts from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleInputName = (e) => setNewName(e.target.value)
  const handleInputNumber = (e) => setNewNumber(e.target.value)
  const handleFilter = (e) => setFilter(e.target.value)

  useEffect(() => {
    contacts
      .getAll()
      .then(p => {
        setPersons(p)
      })
  }, []);

  const handleForm = (e) => {
    e.preventDefault()
    if (persons.find(({name}) => name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    contacts
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setFilter('')
      })
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
      <Persons persons={persons} filter={filter} f={setPersons} />
    </div>
  )
}

export default App