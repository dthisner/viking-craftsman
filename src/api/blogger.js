import Axios from 'axios'

const baseUrl = process.env.BLOGGER_API
const id = process.env.BLOGGER_ID
const authKey = process.env.BLOGGER_AUTH_KEY

// https://developers.google.com/blogger/docs/3.0/using

export const getPosts = async (pageToken) => {
  const response = await Axios.get('/posts', {
    baseURL: `${baseUrl}/blogs/${id}`,
    params: {
      key: authKey,
      pageToken,
    },
  }).catch(() => {
    return {
      error: 'Problem loading next blogpost page!',
    }
  })

  return response
}
