
const Header = ({ course }) => {
  const { id, name, parts } = course
  return (
    <h2 key={id}> {name} </h2>
  )
}
const Total = ({ course }) => {
  const { id, name, parts } = course
  const total = parts.reduce((sum, part) => sum + part.exercises,0)
  return (
    <h3>Total of {total} exercises</h3>
  )
}
const Part = ({ part }) => {
  const { name, exercises, id } = part
  return (
    <p>{name} {exercises}</p>
  )

}

const Course = ({ courses }) => {
  const names = courses.map(x => x.name)

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <div key={course.id}>
          <Header key={course.id} course={course} />
          {course.parts.map(part =>
            <Part key={part.id} part={part} />
          )}
          <Total course={course}/>
        </div>
      )}
    </div>
  )

}
export default Course