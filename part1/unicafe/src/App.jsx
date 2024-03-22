import {useState} from 'react'

const GiveFeedback = ({good, neutral, bad}) => {
    return (
        <section>
            <h2>Give feedback</h2>
            <div style={{display: "flex", gap: "1rem"}}>
                <Button text="Good" onClick={good} />
                <Button text="Neutral" onClick={neutral} />
                <Button text="Bad" onClick={bad} />
            </div>
        </section>
    )
}

const Statistics = ({good, neutral, bad}) => {
    if (good + neutral + bad === 0)
        return (
            <section>
                <h2>Statistics</h2>
                <p>No feedback given</p>
            </section>
        )
    return (
        <section>
            <h2>Statistics</h2>
            <table>
                <tbody>
                    <StatisticLine text="Good" value={good} />
                    <StatisticLine text="Neutral" value={neutral} />
                    <StatisticLine text="Bad" value={bad} />
                    <StatisticLine text="All" value={good + neutral + bad} />
                    <StatisticLine text="Average" value={average(good, neutral, bad)} />
                    <StatisticLine text="Positive" value={positive(good, neutral, bad) + " %"} />
                </tbody>
            </table>
        </section>
    )
}

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>
const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

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