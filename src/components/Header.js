import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
  return (
    <header style={{backgroundColor: 'black'}}>
      <Link to="/">
        {' '}
        <h2 role="banner" data-testid="banner-viking-crafstman">
          Viking Craftsman
        </h2>
      </Link>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link
                className={`${styles.link} nav-link`}
                to="/blog"
                data-testid="header-link-blog"
              >
                Blog <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                className={`${styles.link} nav-link`}
                to="/contact"
                data-testid="header-link-contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
