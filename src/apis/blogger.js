import Axios from 'axios'

const baseUrl = 'https://www.googleapis.com/blogger/v3/blogs'
const id = '/8664291632875595171'
const authKey = 'AIzaSyA_Wd0K_ufq48BekFoX10A-OoJBezdhE5c'

// https://www.googleapis.com/blogger/v3/blogs/8664291632875595171/posts?key=AIzaSyA_Wd0K_ufq48BekFoX10A-OoJBezdhE5c

export default Axios.create({
  baseURL: `${baseUrl}${id}`,
  params: {
    key: authKey,
  },
})
