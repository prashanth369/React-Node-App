import express from 'express'
import routes from './routes/index.js'

const app = express()

const PORT = process.env.PORT || 8080

app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Node server is listening to port: ${PORT}`)
})
