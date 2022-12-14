import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const increaseVote = (anecdote) => {
  return { ...anecdote, "votes": anecdote.votes + 1 }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      console.log('state now: ', state)
      console.log('action', action)
      state.push(asObject(action.payload))
      const response = anecdoteService.addAnecdote(asObject(action.payload))
      console.log(response)
    },
    updateAnecdotes(state, action) {
      console.log('state now: ', state)
      console.log('action', action)
      return state.map(anecdote => anecdote.id === action.payload.id ? anecdote = action.payload : anecdote)
    },
    setAnecdotes(state, action){
      return action.payload
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    }
  }
})

export const { anecdoteReducer, appendAnecdote, voteAnecdote, setAnecdotes, updateAnecdotes } = anecdoteSlice.actions

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addAnecdote(asObject(content))
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const updateVote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.updateVote(id)
    dispatch(updateAnecdotes(anecdote))
  }
}

export default anecdoteSlice.reducer