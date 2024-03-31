import contacts from "../services/contacts.js";

const DeleteButton = ({handler}) => {
  return (
    <button onClick={handler}>delete</button>
  )
}

const Person = ({person, f}) => {
  const {name, number} = person

  return (
    <div style={{display: "flex", flexFlow: "row", gap: "1rem", alignItems: "center"}}>
      <p>{name}: {number}</p>
      <DeleteButton handler={() => {
        if (window.confirm(`Delete ${name}?`)) {
          contacts
            .remove(person.id)
            .then(() => f(persons => persons.filter(p => p.id !== person.id)))
        }
      }} />
    </div>
  )
}

const Persons = ({persons, filter, f}) => persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => <Person key={person.id} person={person} f={f}/>)

export default Persons