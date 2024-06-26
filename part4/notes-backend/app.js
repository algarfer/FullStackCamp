const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require("./controllers/notes")
const logger = require("./utils/logger")
const config = require("./utils/config")
const mongoose = require("mongoose");
const middleware = require("./utils/middleware")

mongoose.set("strictQuery", false)
logger.info("Connecting to", config.MONGODB_URI)


mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch(e => logger.error("Error connecting to MongoDB:", e.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/notes", notesRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app