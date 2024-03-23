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

export default Course