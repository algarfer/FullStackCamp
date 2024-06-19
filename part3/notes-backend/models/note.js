const mongoose = require('mongoose')

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI || "mongodb://root:changeme@localhost:8000/noteApp?authSource=admin"
console.log("Connecting to", url)

mongoose.connect(url)
.then(() => console.log("Connected to MongoDB"))
.catch(e => console.log("Error connecting to MongoDB:", e.message))

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

noteSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model("Note", noteSchema)
