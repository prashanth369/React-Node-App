import express from 'express'

const routes = express.Router()

routes.get('/:number', (req, res) => {
  const { number } = req.params

  res.send({ message: `the number received is: ${number}` })
})

export default routes
