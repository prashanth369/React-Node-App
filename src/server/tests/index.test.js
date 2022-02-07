import supertest from 'supertest'
import app from '../server.js'
import { fetchPrimeNumbers, getMedianPrimeNumbers } from '../utils/index.js'
const request = supertest(app)

describe('Testing the Util Functions', () => {
  test('Test Prime numbers with a Positive Integer', () => {
    const primeNumbers1 = fetchPrimeNumbers(10)
    const primeNumbers2 = fetchPrimeNumbers(20)
    const expectedPrimeNumbers1 = [2, 3, 5, 7]
    const expectedPrimeNumbers2 = [2, 3, 5, 7, 11, 13, 17, 19]

    expect(primeNumbers1).toEqual(expectedPrimeNumbers1)
    expect(primeNumbers2).toEqual(expectedPrimeNumbers2)
  })

  test('Test Prime numbers with a Positive Integer less than 2', () => {
    const primeNumbers1 = fetchPrimeNumbers(1)
    const primeNumbers2 = fetchPrimeNumbers(0)
    const expectedPrimeNumbers = []

    expect(primeNumbers1).toEqual(expectedPrimeNumbers)
    expect(primeNumbers2).toEqual(expectedPrimeNumbers)
  })

  test('Test Prime numbers with a Negartive  Integer', () => {
    expect(() => fetchPrimeNumbers(-10)).toThrowError('Not a valid Number')
    expect(() => fetchPrimeNumbers('10somechars')).toThrowError(
      'Not a valid Number'
    )
  })

  test('Test Get Median of Numbers from an array of numbers', () => {
    const medianValueWithOneNumber = getMedianPrimeNumbers([2, 3, 5, 7, 11])
    const medianValueWithTwoNumber = getMedianPrimeNumbers([2, 3, 5, 7])
    const medianValueWithEmptyNumber = getMedianPrimeNumbers()

    expect(medianValueWithOneNumber).toEqual([5])
    expect(medianValueWithTwoNumber).toEqual([3, 5])
    expect(medianValueWithEmptyNumber).toEqual([])
  })
})
describe('Test Get endpoint /api:number', () => {
  test('GET request with success', async () => {
    const response = await request.get('/api/100')
    const { data, status, message } = response.body

    expect(response.status).toBe(200)
    expect(data).toEqual([41])
    expect(status).toBe('success')
    expect(message).toBe(
      'Median Value of the set of prime numbers less than input number is Successfully Fetched!'
    )
  })

  test('GET request with Invalid Input Number', async () => {
    const response = await request.get('/api/123abc')
    const { status, message } = response.body

    expect(response.status).toBe(200)

    expect(status).toBe('error')
    expect(message).toBe('Not a valid Number')
  })

  test('GET request with empty Negative Numbers', async () => {
    const response = await request.get('/api/-10')
    const { status, message } = response.body

    expect(response.status).toBe(200)

    expect(status).toBe('error')
    expect(message).toBe('Not a valid Number')
  })
})
