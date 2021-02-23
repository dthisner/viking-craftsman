import App from './App'
import {render, screen} from '@testing-library/react'

test('Able to render App', () => {
  render(<App />)
  const headerEleement = screen.getByText(/viking craftsman/i)
  expect(headerEleement).toBeInTheDocument()
})
