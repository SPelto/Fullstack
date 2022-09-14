import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }
  const roundToTwo = (num) => {
    return +(Math.round(num + "e+2")  + "e-2");
}
  const all = (store.getState().good + store.getState().ok + store.getState().bad)
  const positive = (store.getState().good) / all
  const average = (store.getState().good - store.getState().bad) / (all)
  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <h2>Statistics</h2>
      <div>all: {all}</div>
      <div>average: {roundToTwo(average) || "Not enough data"}</div>
      <div>positive: {roundToTwo(positive*100) || "Not enough data"} {all > 0 ? "%" : ""}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
