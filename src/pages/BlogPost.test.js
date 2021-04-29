import React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {getPosts as mockGetPosts} from '../api/blogger'
import BlogPost, {RenderBlogposts, GetBlogImage} from './BlogPosts'

const blogPosts = {
  nextPageToken: 'CgkIChjA3I2yxC0Qo8vB_9rq7554',
  items: [
    {
      id: '3601671524145552855',
      blog: {
        id: '8664291632875595171',
      },
      published: '2021-04-20T15:40:00-07:00',
      updated: '2021-04-21T09:55:30-07:00',
      title: 'We sold our van!',
      content:
        '\u003cp\u003eWe finally did it! After months of looking for the right buyer we finally did it! We found a couple and we spent 4 weeks chatting. They came and saw the van 3 times and on the fourth time, they handed us a check and we handed them a van.&nbsp;\u003c/p\u003e\u003cp\u003e\u003cbr /\u003e\u003c/p\u003e',
      author: {
        displayName: 'Dennis Thisner',
      },
    },
    {
      id: '3601671524145552835',
      blog: {
        id: '8664291632875535171',
      },
      published: '2021-06-20T15:40:00-07:00',
      updated: '2021-06-21T09:55:30-07:00',
      title: 'We are testing this post!',
      content:
        'SO much content it is amazing! what would we do without the content of stuff and things!',
      author: {
        displayName: 'Dennis Thisner',
      },
    },
  ],
}

const loadMorePosts = {
  items: [
    {
      id: '3601671524145552875',
      blog: {
        id: '8664291632875597171',
      },
      published: '2021-05-20T15:40:00-07:00',
      updated: '2021-05-21T09:55:30-07:00',
      title: 'Loading More data',
      content: 'Testing Stuff',
      author: {
        displayName: 'Dennis Thisner',
      },
    },
  ],
}

jest.mock('../api/blogger')

describe('Testing Blogger API to get posts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Blogger API is only being called once', async () => {
    mockGetPosts.mockResolvedValueOnce({data: blogPosts})
    render(<BlogPost />)

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/loading blog posts/i),
    )
    expect(mockGetPosts).toHaveBeenCalledTimes(1)
    expect(screen.getByText(/we sold our van/i)).toBeInTheDocument()
  })

  test('Blogger API is called twice when loading more data', async () => {
    mockGetPosts.mockResolvedValueOnce({data: blogPosts})
    render(<BlogPost />)

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/loading blog posts/i),
    )
    mockGetPosts.mockResolvedValueOnce({data: loadMorePosts})
    userEvent.click(screen.getByText(/load more/i))

    await waitForElementToBeRemoved(() => screen.getByTestId('load-more-posts'))

    expect(mockGetPosts).toHaveBeenCalledTimes(2)
    expect(screen.getByText(/loading more data/i)).toBeInTheDocument()
  })

  test('Blogger API returns an error', async () => {
    const testError = 'Problem loading next blogpost page!'
    mockGetPosts.mockResolvedValueOnce({
      error: testError,
    })
    render(<BlogPost />)

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/loading blog posts/i),
    )
    expect(mockGetPosts).toHaveBeenCalledTimes(1)
    const postError = await screen.findByRole('alert')
    expect(postError).toHaveTextContent(testError)
  })
})

describe('Testing Rendering Blogposts', () => {
  test('Able to render loading icon', async () => {
    render(<RenderBlogposts />)

    expect(screen.getByText(/loading blog posts/i)).toBeInTheDocument()
  })

  test('Able to render multiple posts', async () => {
    render(<RenderBlogposts blogPosts={blogPosts.items} />)

    expect(screen.getByText(/we sold our van/i)).toBeInTheDocument()
    expect(screen.getByText(/we are testing this post/i)).toBeInTheDocument()
  })

  test('Able to render single post', async () => {
    render(<RenderBlogposts blogPosts={loadMorePosts.items} />)

    expect(screen.getByText(/loading more data/i)).toBeInTheDocument()
  })
})

describe('Testing Extracting first Image URLs from blog post', () => {
  test('Able to render loading icon', async () => {
    render(<GetBlogImage post="missing image" />)
    expect(screen.getByAltText(/missing image/i)).toBeInTheDocument()
  })

  test('Able to render loading icon', async () => {
    const postContent =
      '<figure class="wp-block-image size-large"><img alt="" class="wp-image-1131" src="http://viking-craftsman.com/wp-content/uploads/2021/01/IMG_20210106_140820-1024x768.jpg" /></figure><br /><h2>Conclusion</h2><p>I would'

    render(<GetBlogImage post={postContent} title="testing like a boss" />)
    expect(screen.getByAltText(/testing like a boss/i)).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'http://viking-craftsman.com/wp-content/uploads/2021/01/IMG_20210106_140820-1024x768.jpg',
    )
  })
})
