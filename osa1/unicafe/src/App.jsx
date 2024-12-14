import { useState } from 'react'

const Button = ({ onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({ text, value}) => (
<tr>
  <td>{text}</td>
  <td>{value}</td>
</tr>
)

const Statistics = ({good, neutral, bad, total, average, positivePercentage}) => {
  if (total === 0) {
    return <p>No feedback given</p>
}

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={total} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={positivePercentage + " %"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positivePercentage = total === 0 ? 0 : (good / total) * 100

  console.log('Good:', good)
  console.log('Neutral:', neutral)
  console.log('Bad:', bad)
  console.log('Total:', total)
  console.log('Average:', average)
  console.log('Positive:', positivePercentage)

  

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistics
      good={good}
      bad={bad}
      neutral={neutral}
      total={total}
      average={average}
      positivePercentage={positivePercentage}
      />
    </div>
  ) 
}


export default App