import React, {Component} from 'react'
import {BrowserRouter} from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Router from './Router'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Router />
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
}

export default App
