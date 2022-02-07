import React, { useState, useEffect } from 'react'
import { Container, Box, Input, Button } from '@mui/material'
import { PrimeNumberProps } from '../types'
import fetch from '../util/fetch'
import Response from './Response'
import '../styles/main.scss'

const App = () => {
  const [state, setState] = useState<PrimeNumberProps>()
  const [number, setNumber] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const dataFetch = async () => {
    setIsLoading(true)
    const { data, message, status } = await fetch(`/api/${number}`)

    if (status === 'success') {
      setState({ data, message, status })
    } else {
      setState({ status, message })
      setError(message)
    }
    setIsLoading(false)
  }

  const handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement

    if (isNaN(parseInt(target.value)) || parseInt(target.value) < 0) {
      setError('Enter a valid input number')
    } else {
      setError(null)
    }
    setState(prevState => prevState && prevState.data && (prevState.data = undefined))
    setNumber(target.value)
  }

  const handleSubmit = (event: Event) => {
    event.preventDefault()
    if(!error)
        dataFetch()
  }

  return (
    <div className='app'>
      <Container maxWidth='sm'>
        <div className='dashboard-header'>
          <div className='title'> Finding the Median of Prime Numbers </div>
        </div>
        <Box sx={{ height: '80vh', bgcolor: '#f2f2f2' }} className='container'>
          <div className='input-block'>
            <label className='info-text'>
              Please Enter a Number to get the Median Prime numbers less than
              entered number
            </label>
            <Input
              error={error ? true : false}
              onChange={handleInputChange}
              type='number'
              placeholder='Enter a number'
              value={number}
              className='input-button'
            />
            <Button
              onClick={handleSubmit}
              variant='contained'
              type='submit'
              className='submit-button'
            >
              Submit
            </Button>
            <Response state={state} isLoading={isLoading} error={error}/>
          </div>
        </Box>
      </Container>
    </div>
  )
}

export default App
