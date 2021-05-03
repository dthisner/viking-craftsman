import _ from 'lodash'
import Axios from 'axios'
import React, {useEffect, useState} from 'react'

import {getPosts} from '../api/blogger'
import styles from './BlogPosts.module.css'
import {previewText, formatDate} from '../util/stringFormatting'

const BlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState({})
  const [pagnation, setPagnation] = useState({next: null, prev: null})

  useEffect(() => {
    const source = Axios.CancelToken.source()

    const getData = async () => {
      const response = await getPosts()

      updatePostData(response)
    }
    getData()

    return () => {
      source.cancel('Component got unmounted')
    }
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
    const response = await getPosts(action)

    const data = {blogPosts}
    response.data.items.forEach((item) => {
      data.blogPosts.push(item)
    })
    response.data.items = data.blogPosts

    updatePostData(response)
  }

  const RenderPagnation = ({pagnation}) => {
    var renderData = 'No More posts'

    if (pagnation.next) {
      renderData = (
        <button
          data-testid="load-more-posts"
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
    <div className="container-fluid" style={{maxWidth: '800px'}}>
      {' '}
      <h1 role="heading">Blog Posts</h1>
      <RenderBlogposts blogPosts={blogPosts} />
      {!_.isEmpty(blogPosts) && <RenderPagnation pagnation={pagnation} />}
    </div>
  )
}

export const RenderBlogposts = ({blogPosts}) => {
  if (_.isEmpty(blogPosts)) {
    return (
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border"
          data-testid="loading-blog-postsspinner-border"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading Blog Posts...</p>
      </div>
    )
  }

  if (blogPosts.error) {
    return (
      <div
        role="alert"
        className="alert alert-danger"
        align="center"
        role="alert"
      >
        {blogPosts.error}
      </div>
    )
  }

  return blogPosts.map((post) => {
    return <BlogPost key={post.id} post={post} className="" />
  })
}

export const BlogPost = ({post}) => {
  return (
    <div className="card shadow-sm p-3 mb-3 bg-white rounded">
      <div className="row g-0">
        <div className="col-md-4">
          <GetBlogImage post={post.content} title={post.title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{post.title} </h5>
            <p className="card-text">{previewText(post.content, 100)}</p>
            <p className="card-text">
              <small className="text-muted">
                Published: {formatDate(post.published)}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Gets the first image from the blogpost
export const GetBlogImage = ({post, title}) => {
  const image = post.match(/src="([^"]+)"/)
  if (!image) {
    return <img src="" alt="Missing Image"></img>
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
