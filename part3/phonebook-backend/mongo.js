const mongoose = require('mongoose')
const {mongo} = require("mongoose");

if(process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const url = `mongodb://fullstack:${process.argv[2]}@158.179.219.235:8000/phonebook`

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

const callback = async () => {
  if(process.argv.length === 5) {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    })
    await person.save()
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
  } else {
    console.log("phonebook:")
    const result = await Person.find({})
    result.forEach(person => {
      console.log(person.name, person.number)
    })
  }
}

mongoose.connect(url).then(() => {
  callback().then(() => mongoose.connection.close())
})
