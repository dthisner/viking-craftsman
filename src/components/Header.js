import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <Link to="/">
        {' '}
        <h2 role="banner" data-testid="banner-viking-crafstman">
          Viking Craftsman
        </h2>
      </Link>

      <div role="navigation">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/blog"
              data-testid="header-link-blog"
            >
              Blog
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/portfolio"
              data-testid="header-link-portfolio"
            >
              Portfolio
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/about"
              data-testid="header-link-about"
            >
              About Me
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/contact"
              data-testid="header-link-contact"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
