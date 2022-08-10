import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const DisplayNumbers = ({ persons, filter, setPersons, setNotification}) => {
  
  const removeButton = (persons, person) => {
    console.log(persons)
    if (window.confirm(`Remove ${person.name} from phonebook?`)) {
      personService.remove(person.id)
      setPersons(persons.filter(x => x.id != person.id))
      setNotification(
        `Removed ${person.name}`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }


  return (
    <div>
      {persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter))
        .map(person =>
          <p key={person.id + person.name + person.number}> {person.name} {person.number}
            <button onClick={() => removeButton(persons, person)}>remove</button>
          </p>
        )}
    </div>
  )
}

const AddForm = ({ formData }) => {
  const { addPerson, newName, newNumber, handleNameChange, handleNumberChange } = formData
  return (
    < div >
      <h2>Add New</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    </div >
  )
}

const FilterForm = ({ formData }) => {
  const { filter, handleFilterChange } = formData
  return (
    <div>
      <form>
        <div>
          Filter shown with: <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message.includes("!")){
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}


const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.some(x => x.name == newName)) {
      const id = persons.filter(person => person.name == newName)[0].id
      const filteredPersons = persons.filter(person => person.name != newName)
      const index = persons.findIndex((person => person.id == id));
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(id, newPerson)
          .then(returnedPerson => {
            setPersons(filteredPersons.concat(returnedPerson))
          }).catch(error => {
            setNotification(
              `${newPerson.name} has already been removed!`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          setNotification(
            `Changed the number of ${newPerson.name}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        setNewName('')
        setNewNumber('')
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      setNewName('')
      setNewNumber('')
      event.preventDefault()
      setNotification(
        `Added ${newName}`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  // Get data from the JSON server
  useEffect(() => {
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const addFormData = { addPerson, newName, newNumber, handleNameChange, handleNumberChange }
  const addFilterData = { filter, handleFilterChange }



  return (

    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <FilterForm formData={addFilterData} />
      <AddForm formData={addFormData} />
      <DisplayNumbers persons={persons} filter={filter} setPersons={setPersons} setNotification={setNotification} />
    </div>
  )
}


export default App