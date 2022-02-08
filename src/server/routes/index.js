import express from 'express'
import { fetMedianPrimeNumber } from '../controllers/index.js'

const routes = express.Router()

routes.get('/:number', fetMedianPrimeNumber)

export default routes
