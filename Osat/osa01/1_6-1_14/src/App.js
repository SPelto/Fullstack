import { useState } from 'react'


const Header = () => {
  return (
    <div>
      <h1>Give feedback</h1>
    </div>
  )
}

const StaticsLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}
const Statistics = (props) => {
  const total = props.data.good + props.data.neutral + props.data.bad
  return (
    <div>
      <h1>Statistics</h1>
      <StaticsLine  text="good" value={props.data.good}/>
      <StaticsLine  text="neutral" value={props.data.neutral}/>
      <StaticsLine  text="bad" value={props.data.bad}/>
      <StaticsLine  text="average" value={(props.data.good - props.data.bad)/total}/>
      <StaticsLine  text="Positive" value={String((props.data.good)/total * 100) + "%"}/>

      {/* <p>good {props.data.good}</p>
      <p>neutral {props.data.neutral}</p>
      <p>bad {props.data.bad}</p>
      <p>all {total}</p>
      <p>Average {(props.data.good - props.data.bad)/total}</p>
      <p>Positive {(props.data.good)/total * 100}%</p> */}
    </div>
  )
}

const Button = (props) =>{
  const [Good, setGood] = useState(0)
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const data = {good: good, neutral: neutral, bad: bad}
  const handleGoodClick = () => {
    console.log('clicked')
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    console.log('clicked')
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    console.log('clicked')
    setBad(bad + 1)
  }
  
  return (
    <div>
      <Header/>
      <button onClick={handleGoodClick}>
        good
      </button>
      <button onClick={handleNeutralClick}>
        neutral
      </button>
      <button onClick={handleBadClick}>
        bad
      </button>
      <Statistics data={data}/>
    </div>

  )
}

export default App