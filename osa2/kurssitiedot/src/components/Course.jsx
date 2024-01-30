import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
  console.log("From <Course />:", course)
  console.log("From <Course />:", course.parts)

  // calculate total exercises; my initial method: 
  // let total = 0
  // course.parts.map(part => part.exercises).forEach(exercise => total += exercise)
  // console.log("Total exercises from <Course />:", total)

  // calculate total exercises; reduce() method
  const parts = course.parts.map(part => part.exercises)
  const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  console.log("From <Course />: total exercises:", total);

  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} total={total} />
    </>
  )
}
  
export default Course