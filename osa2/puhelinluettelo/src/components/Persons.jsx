const Persons = ( {persons, erase} ) => {
  return (
    <div>
      {persons.map(person => {
        //render the person only if renderState is true
        if (person.renderState) {
          return (
            <p key={person.name}>
              {person.name} {person.number} <button onClick={() => erase(person)}>Delete</button>
            </p>
          )
        }
        return
      })}
    </div>
  )
}
  
export default Persons