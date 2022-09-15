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
    voteAnecdote(state, action) {
      console.log('state now: ', state)
      console.log('action', action)
      return state.map(anecdote => anecdote.id === action.payload ? increaseVote(anecdote) : anecdote)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { anecdoteReducer, createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer