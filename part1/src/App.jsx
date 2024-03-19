
const Header = (props) => {
    return <h1>{ props.title }</h1>
}

const Part = (props) => {
    return <p>{ props.part } { props.exercise }</p>
}

const Content = (props) => {
    return (
        <div>
            { props.data.map((item, index) => <Part key={ index } part={ item.part } exercise={ item.exercise } />) }
        </div>
    )
}

const Total = (props) => {
    return <p>Number of exercises { props.value }</p>
}

const App = () => {
    const course = "Half Stack application development"
    const part1 = "Fundamentals of React"
    const exercises1 = 10
    const part2 = "Using props to pass data"
    const exercises2 = 7
    const part3 = "State of a component"
    const exercises3 = 14

    return (
        <div>
            <Header title={ course } />
            <Content data = {[
                { part: part1, exercise: exercises1 },
                { part: part2, exercise: exercises2 },
                { part: part3, exercise: exercises3 }
            ]} />
            <Total value={ exercises1 + exercises2 + exercises3 } />
        </div>
    )
}

export default App
