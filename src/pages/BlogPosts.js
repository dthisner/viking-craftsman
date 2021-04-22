import _ from 'lodash'
import dateformat from 'dateformat'
import React, {useEffect, useState} from 'react'

import blogger, {getPagnationPosts} from '../apis/blogger'
import styles from './BlogPosts.module.css'

const BlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState({})
  const [pagnation, setPagnation] = useState({next: null, prev: null})

  useEffect(() => {
    const getData = async () => {
      const response = await blogger.get('/posts').catch(() => {
        return {
          error: 'Problem loading blog posts, please try again later!',
        }
      })

      updatePostData(response)
    }
    getData()
  }, [])

  const updatePostData = (response) => {
    if (response.error) {
      setBlogPosts(response)
    } else {
      const data = response.data
      setPagnation({
        next: data.nextPageToken,
        prev: data.prevPageToken,
      })
      setBlogPosts(data.items)
    }
  }

  const LoadMore = async (action) => {
    const response = await getPagnationPosts(action)

    const data = {blogPosts}
    response.data.items.forEach((item) => {
      data.blogPosts.push(item)
    })
    response.data.items = data.blogPosts

    updatePostData(response)
  }

  const RenderPagnation = (pagnation) => {
    var renderData = 'No More posts'

    if (pagnation.next) {
      renderData = (
        <button
          onClick={() => {
            LoadMore(pagnation.next)
          }}
          className={styles.link}
        >
          Load More...
        </button>
      )
    }

    return <div align="center">{renderData}</div>
  }

  return (
    <div>
      <h1 role="heading">Blog Posts</h1>
      {RenderBlogposts(blogPosts)}
      <div>{RenderPagnation(pagnation)}</div>
    </div>
  )
}

export const RenderBlogposts = (blogPosts) => {
  if (_.isEmpty(blogPosts)) {
    return <div>Loading blog posts...</div>
  }

  if (blogPosts.error) {
    return (
      <div className="alert alert-danger" align="center" role="alert">
        {blogPosts.error}
      </div>
    )
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
