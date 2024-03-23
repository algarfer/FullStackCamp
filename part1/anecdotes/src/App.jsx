import { useState } from 'react'

const randomNum = (max) => Math.random() * max | 0
const upVote = (arr, index) => {
    const copy = [...arr]
    copy[index]++
    return copy
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(randomNum(anecdotes.length))
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    return (
        <div style={{display: "flex", flexFlow:"column", gap:"1rem"}}>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <button style={{width: "fit-content"}} onClick={() => setVotes(upVote(votes, selected))}>vote</button>
            <button style={{width: "fit-content"}} onClick={() => setSelected(randomNum(anecdotes.length))}>next anecdote</button>
        </div>
    )
}

export default App