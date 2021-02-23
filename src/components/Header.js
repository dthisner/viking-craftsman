import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <Link to="/">
        {' '}
        <h2 role="banner">Viking Craftsman</h2>
      </Link>

      <Link to="/blog">Blog</Link>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/about">About Me</Link>
      <Link to="/contact">Contact</Link>
    </div>
  )
}

export default Header
