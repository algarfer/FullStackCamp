
const Header = (props) => {
    return <h1>{ props.title }</h1>
}

const Part = (props) => {
    return <p>{ props.exercise.name } { props.exercise.exercises }</p>
}

const Content = (props) => {
    return (
        <div>
            { props.data.map(item => <Part exercise={ item } />) }
        </div>
    )
}

const Total = (props) => {
    return <p>Number of exercises { props.value }</p>
}

const App = () => {
    const course = "Half Stack application development"
    const part1 = {
        name: "Fundamentals of React",
        exercises: 10
    }
    const part2 = {
        name: "Using props to pass data",
        exercises: 7
    }
    const part3 = {
        name: "State of a component",
        exercises: 14
    }

    return (
        <div>
            <Header title={ course } />
            <Content data = { [ part1, part2, part3 ] } />
            <Total value={ part1.exercises + part2.exercises + part3.exercises } />
        </div>
    )
}

export default App
