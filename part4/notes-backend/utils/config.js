require("dotenv").config()

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://root:changeme@localhost:8000/noteApp?authSource=admin"

module.exports = { MONGODB_URI, PORT }