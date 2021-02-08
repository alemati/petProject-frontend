import axios from 'axios'
const baseUrl = 'http://localhost:3006/api/login'
// const baseUrl = '/api/login'


const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  console.log('response was:', response)
  return response.data
}

export default { login }