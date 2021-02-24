import {BrowserRouter} from 'react-router-dom'
import {render as rtlRender} from '@testing-library/react'

export function render(ui, {route = '/', ...renderOptions} = {}) {
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
