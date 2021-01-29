import axios from 'axios'
// const baseUrl = '/users'
const baseUrl = 'http://localhost:3005/api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`

}
const removeToken = () => {
  token = null

}
const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`)
  return response.data
}

const createNew = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject)
  return res.data
}

export default { getAll, getById, createNew, setToken, removeToken, update }