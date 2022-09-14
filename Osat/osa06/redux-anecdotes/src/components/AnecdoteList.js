import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const anecdoteStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = [...useSelector(state => state.anecdotes)].sort((a, b) => b.votes - a.votes)
  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {anecdotes
        .map(anecdote =>
          <div key={anecdote.id} style={anecdoteStyle}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}
export default AnecdoteList