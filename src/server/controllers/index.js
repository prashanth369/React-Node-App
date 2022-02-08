import { fetchPrimeNumbers, getMedianPrimeNumbers } from '../utils/index.js'

export const fetMedianPrimeNumber = (req, res) => {
  const { number } = req.params
  const response = {}

  try {
    const allPrimeNumbers = fetchPrimeNumbers(number)
    const medianPrimeNumbers = getMedianPrimeNumbers(allPrimeNumbers)

    response.data = medianPrimeNumbers
    response.status = 'success'
    response.message =
      'Median Value of the set of prime numbers less than input number is Successfully Fetched!'
  } catch (err) {
    response.status = 'error'
    response.message = err.message
  }
  res.send(response)
}
