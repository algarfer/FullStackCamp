import contacts from "../services/contacts.js";

const DeleteButton = ({handler}) => {
  return (
    <button onClick={handler}>delete</button>
  )
}

const Person = ({person, f, changeMessage}) => {
  const {name, number} = person

  return (
    <div style={{display: "flex", flexFlow: "row", gap: "1rem", alignItems: "center"}}>
      <p>{name}: {number}</p>
      <DeleteButton handler={() => {
        if (window.confirm(`Delete ${name}?`)) {
          contacts
            .remove(person.id)
            .then(() => f(persons => persons.filter(p => p.id !== person.id)))
            .catch(() => changeMessage(`Information of ${name} has already been removed from server`, false))
        }
      }} />
    </div>
  )
}

const Persons = ({persons, filter, f, changeMessage}) => persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => <Person key={person.id} person={person} f={f} changeMessage={changeMessage} />)

export default Persons