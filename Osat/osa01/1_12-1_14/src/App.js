import { useState } from 'react'


const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.floor(Math.random() * (max - min + 1) + min))
}

const Display = (props) => {
  const maxVote = Math.max(...props.points)

  if (props.points.reduce((partialSum, a) => partialSum + a, 0) === 0) {
    return (
      <div>
        <h1> Anecdote of the day</h1>
        <div>{props.anecdotes[props.anecdote]}</div>
        <div>has {props.points[props.anecdote]} votes</div>
      </div>
    )
  } else {
    return (
      <div>
        <h1> Anecdote of the day</h1>
        <div>{props.anecdotes[props.anecdote]}</div>
        <div>has {props.points[props.anecdote]} votes</div>
        <h1> Anecdote with most votes</h1>
        <div> {props.anecdotes[props.points.indexOf(maxVote)]}</div>
      </div>
    )
  }
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [anecdote, setAnecdote] = useState(0)
  const handleAnecdoteClick = () => setAnecdote(getRandomInt(0, 6))

  const [points, setPoints] = useState(new Uint8Array(7))
  const handleVoteClick = () => {
    const newPoints = [
      ...points]
    newPoints[anecdote] += 1
    setPoints(newPoints)
  }


  return (
    <div>
      <Display anecdotes={anecdotes} anecdote={anecdote} points={points} />
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleAnecdoteClick} text='next anecdote' />
    </div>
  )
}

export default App