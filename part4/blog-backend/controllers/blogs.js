const router = require("express").Router()
const Blog = require("../models/blog")

router.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => res.json(blogs))
})

router.post('/', (req, res, next) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => res.status(201).json(result))
    .catch(err => next(err))
})

module.exports = router
