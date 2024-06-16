import {useState, useEffect} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import contacts from "./services/contacts";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [correct, setCorrect] = useState(true)

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

  const changeMessage = (message, correct) => {
    setMessage(message)
    setCorrect(correct)
    setTimeout(() => setMessage(null), 2000)
  }

  const handleForm = (e) => {
    e.preventDefault()

    contacts.getByName(newName)
      .then(p => {
        if (p.length > 0) {
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            contacts
              .update(p[0].id, {...p[0], number: newNumber})
              .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== p[0].id ? person : returnedPerson))
                setNewName('')
                setNewNumber('')
                setFilter('')
                changeMessage(`Updated ${returnedPerson.name}`, true)
              })
          }
        } else {
          contacts
            .create({ name: newName, number: newNumber, id: persons.length + 1 })
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
              setFilter('')
              changeMessage(`Added ${returnedPerson.name}`, true)
            })
        }
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {message && <Notification message={message} correct={correct}></Notification>}
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
      <Persons persons={persons} filter={filter} f={setPersons} changeMessage={changeMessage} />
    </div>
  )
}

export default App