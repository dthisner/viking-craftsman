import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <h3>Footer</h3>
      <div role="navigation">
        <Link to="/blog" data-testid="footer-link-blog">
          Blog
        </Link>
        <Link to="/portfolio" data-testid="footer-link-portfolio">
          Portfolio
        </Link>
        <Link to="/about" data-testid="footer-link-about">
          About Me
        </Link>
        <Link to="/contact" data-testid="footer-link-contact">
          Contact
        </Link>
      </div>
    </footer>
  )
}

export default Footer
