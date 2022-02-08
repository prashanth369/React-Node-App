import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom'
import { waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import fetch from '../util/fetch'
import App from '../components/App'

jest.mock('../util/fetch', () =>
  jest.fn(() => ({ data: [3, 5], status: 'success' }))
)
const mockedAxios = fetch as jest.Mock

describe('Test for App Component', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)

    act(() => {
      ReactDOM.render(<App />, container)
    })
  })

  afterAll(() => {
    document.body.removeChild(container)
    container.remove()
    jest.unmock('../util/fetch')
  })

  test('Renders the Component Correctly', () => {
    const headerContainer: HTMLDivElement = container.querySelector(
      '.dashboard-header'
    )
    const inputBlock: HTMLInputElement = container.querySelector('.input-block')
    const responseBlock: HTMLDivElement = container.querySelector(
      '.response-block'
    )

    expect(headerContainer).toBeInTheDocument()
    expect(inputBlock).toBeInTheDocument()
    expect(responseBlock).not.toBeInTheDocument()
  })

  test('Displaying the Response Correctly', async () => {
    const inputButton: HTMLInputElement = container.querySelector(
      '.input-button'
    )
    const submitButton: HTMLButtonElement = container.querySelector(
      '.submit-button'
    )

    await act(async () => {
      inputButton.value = '10'
      submitButton.click()
      const mockResponse = {
        data: [3, 5],
        message:
          'Median Value of the set of prime numbers less than input number is Successfully Fetched!',
        status: 'success'
      }
      mockedAxios.mockResolvedValueOnce(mockResponse)

      await waitFor(() => {
        const responseBlock: HTMLDivElement = container.querySelector(
          '.response-block'
        )
        const responseLabel = responseBlock.querySelector('label')
        expect(responseBlock).toBeInTheDocument()
        expect(responseLabel.textContent.replace(/\s\s+/g, ' ').trim()).toBe(
          'The Median Prime numbers of the set of Prime Numbers less than Entered Input are : 3, 5'
        )
      })
    })
  })

  test('Display Error when the input selected is an invalid value', async () => {
    jest.mock('../util/fetch', () =>
      jest.fn(() => ({
        message: 'Enter a valid input number',
        status: 'error'
      }))
    )
    const inputButton: HTMLInputElement = container.querySelector(
      '.input-button'
    )
    const submitButton: HTMLButtonElement = container.querySelector(
      '.submit-button'
    )

    await act(async () => {
      userEvent.type(inputButton, '-100')
      submitButton.click()
      await waitFor(() => {
        const responseBlock: HTMLDivElement = container.querySelector(
          '.response-block'
        )
        const responseLabel = responseBlock.querySelector('label')
        expect(responseBlock).toBeInTheDocument()
        expect(responseLabel.textContent).toBe('Enter a valid input number')
      })
    })
  })
})
