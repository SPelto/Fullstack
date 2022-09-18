import { Link } from "react-router-dom"

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id} >
          <ul> <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></ul>
        </li>)}
    </ul>
  </div>
)

export default AnecdoteList