import { useState } from 'react'

const GiveFeedback = ({good, neutral, bad}) => {
    return (
        <section>
            <h2>Give feedback</h2>
            <div style={{display: "flex", gap: "1rem"}}>
                <button onClick={good}>good</button>
                <button onClick={neutral}>neutral</button>
                <button onClick={bad}>bad</button>
            </div>
        </section>
    )
}

const Statistics = ({good, neutral, bad}) => {
    if(good + neutral + bad === 0)
        return (
            <section>
                <h2>Statistics</h2>
                <p>No feedback given</p>
            </section>
        )
    return (
        <section>
            <h2>Statistics</h2>
            <ul>
                <li>Good: {good}</li>
                <li>Neutral: {neutral}</li>
                <li>Bad: {bad}</li>
                <li>All: {good + neutral + bad}</li>
                <li>Average: {average(good, neutral, bad)}</li>
                <li>Positive: {positive(good, neutral, bad)} %</li>
            </ul>
        </section>
    )
}

const increaseValue = (value, f) => f(value + 1)
const average = (good, neutral, bad) => (good + neutral + bad) === 0 ? 0 : (good - bad) / (good + neutral + bad)
const positive = (good, neutral, bad) => (good + neutral + bad) === 0 ? 0 : good * 100 / (good + neutral + bad)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>UniCafe</h1>
            <GiveFeedback
                good={() => increaseValue(good, setGood)}
                neutral={() => increaseValue(neutral, setNeutral)}
                bad={() => increaseValue(bad, setBad)}
            />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
  )
}

export default App