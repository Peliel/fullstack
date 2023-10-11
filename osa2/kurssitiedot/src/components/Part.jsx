const Part = ({ name, exercises, bold }) => {
  console.log("From <Part />:", name + " " + exercises)
  if (bold == true) return (
    <>
      <p>
        <b>{name} {exercises}</b>
      </p>
    </>
  ); else return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  )
}
  
export default Part