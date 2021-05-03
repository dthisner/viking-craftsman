import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {render} from '../../test/util'
import App from './App'

const tests = [
  {
    link: 'blog',
    expected: 'blog posts',
  },
  {
    link: 'contact',
    expected: 'contact',
  },
]
describe('Testing footer', () => {
  tests.forEach(({link, expected}) => {
    test(`Using Footer = Able to Navigate to ${test.link}`, () => {
      render(<App />)
      const regex = new RegExp(expected, 'i')
      userEvent.click(screen.getByTestId(`header-link-${link}`))
      expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(regex)
    })
  })

  test('Landing at a bad page shos 404', () => {
    render(<App />, {route: '/this-will-not-worl'})
    expect(screen.getByText(/sorry! no match/i)).toBeInTheDocument()
  })
})
