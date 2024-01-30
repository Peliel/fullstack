import Course from './components/Course'

const App = ({ courses }) => {
  console.log("From <App />:", courses)
  console.log("From <App />:", courses[0])
  console.log("From <App />:", courses[1])

  return (
    <div>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default App