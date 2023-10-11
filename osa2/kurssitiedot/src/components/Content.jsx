import Part from './Part'

const Content = ({ parts, total }) => {
  console.log("From <Content />:", parts)
  console.log("From <Content />:", parts.map(part => part.name + " " + part.exercises))
  return (
    <>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <Part name={"Total of " + total + " exercises"} bold={true} />
    </>
  )
}
  
export default Content