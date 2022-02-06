import {fetchPrimeNumbers, getMedianPrimeNumbers} from '../utils/index.js'

export const fetMedianPrimeNumber = (req, res) => {
  const { number } = req.params
  let response = {}

  try {
    const allPrimeNumbers = fetchPrimeNumbers(number)
    const medianPrimeNumbers = getMedianPrimeNumbers(allPrimeNumbers)

    response.data = JSON.stringify(medianPrimeNumbers)
    response.status = 'success'
    response.message = 'Median Value is Successfully Fetched!'
  } catch (err) {
    response.status = 'error'
    response.message = err.message
  }
  res.send(response)
}
