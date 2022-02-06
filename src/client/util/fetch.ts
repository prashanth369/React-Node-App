import axios from 'axios'
import { PrimeNumberProps } from '../types'

const fetch = async (url: string): Promise<PrimeNumberProps> => {
  let medianPrimeNumbers: PrimeNumberProps

  try {
    const { data }: { data: PrimeNumberProps } = await axios.get(url)
    medianPrimeNumbers = data
  } catch (err) {
    medianPrimeNumbers = {
      status: 'error',
      message: err.message
    }
  }

  return medianPrimeNumbers
}

export default fetch
