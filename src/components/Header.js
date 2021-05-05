import React from 'react'
import {Link} from 'react-router-dom'

import styles from './Header.module.css'
import Banner from '../assets/banner.png'

const Header = () => {
  return (
    <header style={{backgroundColor: 'white'}}>
      <Link to="/">
        {' '}
        <img
          alt="Viking Craftsman Banner"
          src={Banner}
          data-testid="banner-viking-crafstman"
          className="rounded mx-auto d-block"
        ></img>
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
