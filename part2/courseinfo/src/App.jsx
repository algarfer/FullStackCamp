const Header = (props) => {
    return <h1>{props.title}</h1>
}

const Part = (props) => {
    return <p>{props.exercise.name} {props.exercise.exercises}</p>
}

const Content = (props) => {
    return (
        <div>
            {props.data.map(item => <Part key={item.id} exercise={item} />)}
        </div>
    )
}

const Total = (props) => {
    return <p>Number of exercises {props.values.reduce((acc, current) => acc + current.exercises, 0)}</p>
}

const Course = ({course}) => {
    return (
        <div>
            <Header title={course.name} />
            <Content data={course.parts} />
            <Total values={course.parts} />
        </div>
    )
}

const App = () => {
    const course = {
        id: 1,
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
                id: 1
            },
            {
                name: "Using props to pass data",
                exercises: 7,
                id: 2
            },
            {
                name: "State of a component",
                exercises: 14,
                id: 3
            },
            {
                name: "Redux",
                exercises: 11,
                id: 4
            }
        ]
    }

    return <Course course={course} />
}

export default App
