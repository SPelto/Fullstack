import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { message } from '../reducers/notificationReducer'

const anecdoteStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const getAnecdote = (id, anecdotes) => {
  return anecdotes.filter(anecdote => anecdote.id === id)[0]
}
const messageUpdate = (dispatch, id, anecdotes) => {
  dispatch(message(`You voted '${getAnecdote(id, anecdotes).content}'`)) // Continue to add notifications for voting
  setTimeout(() => {
    dispatch(message(null))
  }, 5000)
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = [...useSelector(state => state.anecdotes)].sort((a, b) => b.votes - a.votes)
  const filterValue = useSelector(state => state.filter)
  const vote = (id) => {
    dispatch(voteAnecdote(id))
    messageUpdate(dispatch, id, anecdotes)
  }

  return (
    <div>
      {anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(filterValue.toLowerCase()))
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