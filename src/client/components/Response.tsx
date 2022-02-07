import React from 'react'
import { ResponseProps } from '../types'

const Response = ({ state, isLoading, error }: ResponseProps) => {
  let responseText = null
  const showSuccessResponse = state && state.data && !isLoading && !error
  if (showSuccessResponse) {
    responseText = `
        The Median Prime numbers of the set of Prime Numbers less than
        Entered Input are : ${
          state.data.length > 0 ? state.data.join(', ') : '[]'
        }`
  } else if (error) {
    responseText = error
  }

  return responseText ? (
    <div className={`response-block ${error ? 'error' : ''}`}>
      <label>{responseText}</label>
    </div>
  ) : null
}

export default Response
