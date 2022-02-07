/**
 * Returns array of prime numbers less than number as an array.
 *
 * @param {number} number The number to get all the prime numbers less than number.
 * @return {number[]} allPrimeNumbers all the prime numbers less than input number.
 */

export const fetchPrimeNumbers = number => {
    //If the input number is not a number or a negative number
    if (isNaN(number) || number < 0) {
      throw Error('Not a valid Number')
    }
  
    //Edge case when the number selected is 0, 1 or 2 return a single value
    if (number <= 2) {
      return number < 2 ? [] : [2]
    }
  
    //Initialize an empty array
    const numbersArray = new Array(number - 1)
  
    //We take the array from number 2 and fetch all the prime numbers less than n
    for (let i = 2; i < number; i++) {
      let numberFactor = i * i
  
      // If the value at the index of an array is not crossed, then fill that
      if (numbersArray[i - 2] !== -1) numbersArray[i - 2] = i
  
      //For all the factors of a number, cross those indexed values by replacing number with -1
      while (numberFactor < number) {
        if (numbersArray[numberFactor - 2] !== -1) {
          numbersArray[numberFactor - 2] = -1
        }
  
        numberFactor += i
      }
    }
  
    //Now the remaining numbers with values not crossed are the prime numbers
    const allPrimeNumbers = numbersArray.filter(num => num !== -1)
    return allPrimeNumbers
  }
  
  /**
   * Returns array of median values of an array.
   *
   * @param {number[]} primeNumbers The number to get median.
   * @return {number[]} medianPrimeNumbers the median values.
   */
  export const getMedianPrimeNumbers = primeNumbers => {
    const medianPrimeNumbers = []
    if (!primeNumbers || primeNumbers.length === 0) {
      return []
    }
  
    if (primeNumbers.length % 2 === 0) {
      const medianNumberIndex = primeNumbers.length / 2
      medianPrimeNumbers.push(primeNumbers[medianNumberIndex - 1])
      medianPrimeNumbers.push(primeNumbers[medianNumberIndex])
    } else {
      const medianNumberIndex = Math.floor(primeNumbers.length / 2)
      medianPrimeNumbers.push(primeNumbers[medianNumberIndex])
    }
  
    return medianPrimeNumbers
  }
  