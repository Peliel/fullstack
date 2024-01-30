import { useState, useEffect } from 'react'
import personService from './services/persons.js'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification.jsx'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newKeyword, setNewKeyword ] = useState('')
  const [ noteMessage, setNoteMessage ] = useState('An unexpected error occurred...')
  const [ noteType, setNoteType ] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log(`render ${persons.length} persons`)

  //function for adding persons to 'persons'
  const addPerson = (event) => {
    event.preventDefault()
    setNewKeyword('')

    //construct an object from the data obtained from the form
    const personObject = {
      name: newName,
      number: newNumber,
      renderState: true
    }
  
    //check if person exists
    const allNames = persons.map(person => person.name)
    if (allNames.includes(newName)) {
      if (!confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return 0
      }
      const id = persons.filter(person => person.name == newName)[0].id
      console.log(id)
      personService
        .update(id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
        .catch(error => {
          setNoteMessage(`Error: could not find ${newName} from the server.`)
          setNoteType('error')
          setTimeout(() => {
            setNoteMessage(null)
            setNoteType(null)
          }, 3000)
        })
      
      //create a UI message and set to disappear after 3 seconds
      setNoteMessage(`Updated the number of ${newName}.`)
      setNoteType('note')
      setTimeout(() => {
        setNoteMessage(null)
        setNoteType(null)
      }, 3000)
      return 1
    }

    personService
    .getAll()
    .then(serverPersons => {
      serverPersons.map(person => {
      if (person.name == newName) {
        setNoteMessage(`Error: ${newName} was already added to the server.`)
        setNoteType('error')
        setTimeout(() => {
          setNoteMessage(null)
          setNoteType(null)
        }, 3000);
        return -1
      }
    })

    })

    //update 'persons' to a list with the new person
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })

    //create a UI message and set expiry to 3 seconds
    setNoteMessage(`Added ${newName} to the phonebook.`)
    setNoteType('note')
    setTimeout(() => {
      setNoteMessage(null)
      setNoteType(null)
    }, 3000)
    return 1
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    //reset search field to run away from any potential errors
    //setNewKeyword('')
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    //reset search field to run away from any potential errors
    //setNewKeyword('')
  }

  const handleKeywordChange = (event) => {
    //console.log(event.target.value)
    setNewKeyword(event.target.value)

    //a temporary basket for persons with updated 'renderState'
    const filteredPersonList = []

    //if filter input is empty, set renderState to true for each person
    if (event.target.value == '') {
      persons.forEach(person => {
        //a temporary personObject to be added to 'persons' later
        const personObject = {
          name: person.name,
          number: person.number,
          renderState: true
        }
        filteredPersonList.push(personObject)
      })
      setPersons(filteredPersonList)
      //console.log('Filtering process terminated. Search string \'\'; all persons set to be rendered.')
      //console.log(persons)
      return -1
    }

    //console.log('All persons', persons)

    //running checks through each person in the phonebook
    persons.forEach(person => {    
      const nameString = person.name.toLocaleLowerCase()
      const personNumber = person.number
      const keyWord = event.target.value.toLowerCase()

      //check if the keyword string matches with the name or number of the current person
      if (nameString.match(keyWord) || personNumber.match(keyWord)) {
        //set personObject with renderState to true so it will show
        const personObject = {
          name: person.name,
          number: person.number,
          renderState: true
        }
        //console.log('Search string matched with person', personObject, '. RenderState was set to true.')
        filteredPersonList.push(personObject)
      } else {
        //keyword string did not match with the person; set renderState to false
        const personObject = {
          name: person.name,
          number: person.number,
          renderState: false
        }
        //console.log('Search string did not match with person', personObject, '. RenderState state was set to false.')
        filteredPersonList.push(personObject)
      }
    })
    setPersons(filteredPersonList)
  }

  const deletePerson = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      //delete person from database
      personService
      .erase(person)
      .catch(error => {
        setNoteMessage(`Error: ${person.name} was already removed from the server.`)
        setNoteType('error')
        setTimeout(() => {
          setNoteMessage(null)
          setNoteType(null)
        }, 3000)
        return 0
      })
      //delete person from UI
      setPersons(persons.filter(p => person.id !== p.id))

      setNoteMessage(`${person.name} deleted successfully.`)
      setNoteType('note')
      setTimeout(() => {
        setNoteMessage(null)
        setNoteType(null)
      }, 3000)
    }
    return 1
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={noteMessage} type={noteType} />
      <Filter newKeyword={newKeyword} handleKeywordChange={handleKeywordChange} />
      <h2>Add a contact</h2>
      <PersonForm onSubmit={addPerson}
        inputAttributes={[
          {
            text: 'Name',
            value: newName,
            handleChange: handleNameChange
          },
          {
            text: 'Number',
            value: newNumber,
            handleChange: handleNumberChange
          }
        ]}
        buttonText='Add'
      />
      <h2>Numbers</h2>
      <Persons persons={persons} erase={deletePerson} />
    </div>
  )
}

export default App