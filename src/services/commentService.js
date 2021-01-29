import axios from 'axios'
const baseUrl = 'http://localhost:3005/api/comments'

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

const remove = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response
}

const createNew = async (newObject) => {
    console.log('token is:', token)
    console.log('newObject (comment) is:', newObject)
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (id, newObject) => {
    const res = await axios.put(`${baseUrl}/${id}`, newObject)
    return res.data
}

export default { getAll, getById, createNew, setToken, removeToken, update, remove }