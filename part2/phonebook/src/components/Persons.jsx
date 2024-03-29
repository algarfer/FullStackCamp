const Persons = ({persons, filter}) => persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => <p key={person.id}>{person.name}: {person.number}</p>)

export default Persons