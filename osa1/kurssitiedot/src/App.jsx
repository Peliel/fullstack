const Header = (props) => {
  console.log("Header props: ", props)
  console.log("Header HTML output: ", props.course.name)

  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Part = (props) => {
  console.log("Part props: ", props)

  console.log("Part props name: ", props.part.name)
  console.log("Parts prop exercises: ", props.part.exercises)

  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  console.log("Content props: ", props)

  console.log("Content props object 0: ", props.course.parts[0])
  console.log("Content props object 1: ", props.course.parts[1])
  console.log("Content props object 2: ", props.course.parts[2])

  return (
    <>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
    </>
  )
}

const Total = (props) => {
  console.log("Total props: ", props)
  console.log("Total HTML sample output: ", props.course.parts[0].exercises)

  return (
    <>
      <p>
        Number of exercises {
          props.course.parts[0].exercises + 
          props.course.parts[1].exercises + 
          props.course.parts[2].exercises
        }
      </p>
    </>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development', 
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      }, 
      {
        name: 'Using props to pass data', 
        exercises: 7
      }, 
      {
        name: 'State of a component', 
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App