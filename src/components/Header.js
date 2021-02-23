import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <Link to="/">
        {' '}
        <h2 role="banner" data-testid="banner-viking-crafstman">
          Viking Craftsman
        </h2>
      </Link>

      <div role="navigation">
        <Link to="/blog" data-testid="header-link-blog">
          Blog
        </Link>
        <Link to="/portfolio" data-testid="header-link-portfolio">
          Portfolio
        </Link>
        <Link to="/about" data-testid="header-link-about">
          About Me
        </Link>
        <Link to="/contact" data-testid="header-link-contact">
          Contact
        </Link>
      </div>
    </div>
  )
}

export default Header
