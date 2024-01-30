import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl).then(response => {
    return response.data
  })
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => {
    return response.data
  })
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => {
    return response.data
  })
}

const erase = person => {
  return axios.delete(`${baseUrl}/${person.id}`).then(response => {
    return response.status
  })
}

export default { getAll, create, update, erase }

