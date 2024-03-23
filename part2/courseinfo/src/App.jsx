const Header = (props) => {
    return <h2>{props.title}</h2>
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
    return <p><b>Number of exercises {props.values.reduce((acc, current) => acc + current.exercises, 0)}</b></p>
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
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <>
            <h1>Web development curriculum</h1>
            {courses.map(course => <Course key={course.id} course={course} />)}
        </>
    )
}

export default App
