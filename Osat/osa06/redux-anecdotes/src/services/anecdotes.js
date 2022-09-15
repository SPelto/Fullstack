import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getById = async (id) => {
  const response = await getAll(baseUrl)
  const anecdote = response.filter(anecdote => anecdote.id === id)[0]
  return anecdote
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAnecdote = async (content) => {
  console.log(content)
  const response = await axios.post(baseUrl, content)
  return response.data
}

const updateVote = async (id) => {
  console.log(id)
  const anecdote = await getById(id)
  const voteVal = anecdote.votes + 1
  const response = await axios.patch(`${baseUrl}/${id}`, {"votes":voteVal})
  return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addAnecdote , updateVote, getById }