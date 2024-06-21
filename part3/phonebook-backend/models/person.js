const mongoose = require('mongoose')

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI || "mongodb://root:changeme@localhost:8000/noteApp?authSource=admin"
console.log("Connecting to", url)

mongoose.connect(url)
.then(() => console.log("Connected to MongoDB"))
.catch(e => console.log("Error connecting to MongoDB:", e.message))

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: (v) => /\d{2,3}-\d+/.test(v),
      message: props => `${props.value} is not valid`
    }
  },
})

phonebookSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model("Person", phonebookSchema)
