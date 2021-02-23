import {BrowserRouter} from 'react-router-dom'
import {render as rtlRender, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

// normally you'd put this logic in your test utility file so it can be used
// for all of your tests.
function render(ui, {route = '/', ...renderOptions} = {}) {
  // we'll set our route properly here
  window.history.pushState({}, 'Test page', route)

  function Wrapper({children}) {
    // originally this rendered a Router with a memory history
    // but using the actual BrowserRouter is more correct and
    // is actually easier anyway.
    return <BrowserRouter>{children}</BrowserRouter>
  }
  return rtlRender(ui, {
    wrapper: Wrapper,
    ...renderOptions,
    // originally this exposed history, but that's really
    // an implementation detail, so we don't recommend that anymore
  })
}

const tests = [
  {
    link: 'portfolio',
    expected: 'portfolio',
  },
  {
    link: 'blog',
    expected: 'blog posts',
  },
  {
    link: 'about',
    expected: 'about me',
  },
  {
    link: 'contact',
    expected: 'contact',
  },
]

tests.forEach(({link, expected}) => {
  test(`Using Footer = Able to Navigate to ${test.link}`, () => {
    render(<App />)

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(/home/i)

    const regex = new RegExp(expected, 'i') // correct way
    userEvent.click(screen.getByTestId(`footer-link-${link}`))
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(regex)
  })
})

test('Landing at a bad page shos 404', () => {
  render(<App />, {route: '/this-will-not-worl'})
  expect(screen.getByText(/sorry! no match/i)).toBeInTheDocument()
})
