import _ from 'lodash'
import dateformat from 'dateformat'
import React, {useEffect, useState} from 'react'

import blogger from '../apis/blogger'

const BlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState({})
  const [pagnation, setpagnation] = useState({next: null, prev: null})

  useEffect(() => {
    const getData = async () => {
      var error = null
      const response = await blogger.get('/posts').catch(function (error) {
        return {
          error: 'Problem loading blog posts, please try again later!',
        }
      })

      if (response.error) {
        setBlogPosts(response)
      } else {
        const data = response.data
        setpagnation({
          next: data.nextPageToken,
          prev: data.prevPageToken,
        })
        setBlogPosts(data.items)
      }
    }
    getData()
  }, [])

  return (
    <div>
      <h1 role="heading">Blog Posts</h1>
      {RenderBlogposts(blogPosts)}
      <div className="">{RenderPagnation(pagnation)}</div>
    </div>
  )
}

export const RenderBlogposts = (blogPosts) => {
  if (_.isEmpty(blogPosts)) {
    return <div>Loading blog posts</div>
  }
  console.log(blogPosts)

  if (blogPosts.error) {
    return <div>{blogPosts.error}</div>
  }

  const data = blogPosts.map((post) => {
    return (
      <div className="card mb-3" key={post.id}>
        <div className="row g-0">
          <div className="col-md-4">
            {GetBlogImage(post.content, post.title)}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{post.title} </h5>
              <p className="card-text">{postPreview(post.content)}</p>
              <p className="card-text">
                <small className="text-muted">
                  Published: {dateFormat(post.published)}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  })
  return data
}

export const RenderPagnation = (pagnation) => {
  return (
    <div className="row">
      <div className="col-sm">
        {`<<<`} <a href={pagnation.prev}> Prev </a>
      </div>
      <div className="col-sm" align="center">
        |
      </div>
      <div className="col-sm " align="right">
        {' '}
        <a href={pagnation.next}> Next {`>>>`}</a>
      </div>
    </div>
  )
}

export const postPreview = (c) => {
  var content = c.replace(/<[^>]+>/g, '')

  return content.substr(0, 100) + '...'
}

export const dateFormat = (d) => {
  return dateformat(d, 'dS mmmm yyyy').toString()
}

// Gets the first image from the blogpost
export const GetBlogImage = (post, title) => {
  const image = post.match(/src="([^"]+)"/)
  if (!image) {
    return <img src="..." alt="..."></img>
  }

  return (
    <img
      src={image[1].replace('src="', '')}
      alt={title}
      style={{maxWidth: '250px'}}
    ></img>
  )
}

export default BlogPosts
