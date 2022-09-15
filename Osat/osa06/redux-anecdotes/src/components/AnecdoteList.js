import { useDispatch, useSelector } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'

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
  const filterValue = useSelector(state => state.filter)
  const vote = (anecdote) => {
    dispatch(updateVote(anecdote.id))
    dispatch(updateNotification(`you voted '${anecdote.content}'`, 5000))
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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}
export default AnecdoteList