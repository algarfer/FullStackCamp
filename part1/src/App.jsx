const Header = (props) => {
    return <h1>{props.title}</h1>
}

const Part = (props) => {
    return <p>{props.exercise.name} {props.exercise.exercises}</p>
}

const Content = (props) => {
    return (
        <div>
            {props.data.map(item => <Part exercise={item} />)}
        </div>
    )
}

const Total = (props) => {
    return <p>Number of exercises {props.values.reduce((acc, current) => acc + current.exercises, 0)}</p>
}

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10
            },
            {
                name: "Using props to pass data",
                exercises: 7
            },
            {
                name: "State of a component",
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header title={course.name} />
            <Content data={course.parts} />
            <Total values={course.parts} />
        </div>
    )
}

export default App
