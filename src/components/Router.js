import React from 'react'
import {Route, Switch} from 'react-router-dom'

import {AboutMe, Portfolio, Home, Contact, BlogPosts, NoMatch} from '../pages'

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/blog" component={BlogPosts} />
      <Route path="/about" component={AboutMe} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog" component={BlogPosts} />
      <Route component={NoMatch} />
    </Switch>
  )
}

export default Router
