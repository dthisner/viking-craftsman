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

      <div>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link
              className={`${styles.link} nav-link`}
              to="/blog"
              data-testid="header-link-blog"
            >
              Blog
            </Link>
          </li>
          <li className="nav-item ">
            <Link
              className={`${styles.link} nav-link`}
              to="/portfolio"
              data-testid="header-link-portfolio"
            >
              Portfolio
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`${styles.link} nav-link`}
              to="/about"
              data-testid="header-link-about"
            >
              About Me
            </Link>
          </li>
          <li className="nav-item">
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
    </header>
  )
}

export default Header
