import { useState } from 'react'


const Header = () => {
  return (
    <div>
      <h1>Give feedback</h1>
    </div>
  )
}

const StaticsLine = (props) => {
  const { text, value } = props
  return (
      <tr>
        <td> {text} </td>
        <td> {value} </td>
      </tr>
  )
}

const Statistics = (props) => {
  const total = props.data.good + props.data.neutral + props.data.bad
  if (total != 0){
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
          <StaticsLine  text="good" value={props.data.good}/>
          <StaticsLine  text="neutral" value={props.data.neutral}/>
          <StaticsLine  text="bad" value={props.data.bad}/>
          <StaticsLine  text="average" value={(props.data.good - props.data.bad)/total}/>
          <StaticsLine  text="Positive" value={String((props.data.good)/total * 100) + "%"}/>
          </tbody> 
        </table>
      </div>
)
  } else {
      return(
        <div>
          <h1>Statistics</h1>
          <p>No feedback given</p>
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
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const data = {good: good, neutral: neutral, bad: bad}

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)
  


  return (
    <div>
      <Header/>

      <Button
        handleClick={handleGoodClick}
        text='good'
      />
      <Button
        handleClick={handleNeutralClick}
        text='neutral'
      />     
      <Button
        handleClick={handleBadClick}
        text='bad'
      />  
      <Statistics data={data}/>
    </div>

  )
}

export default App