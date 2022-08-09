import { useState } from 'react'


const DisplayNumbers = ({ persons, filter }) => (
  <div>
    {persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter))
      .map(person =>
       <p key={person.number}>{person.name} {person.number}</p>)}
  </div>
)

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

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log({ newName })
    console.log({ newNumber })
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.some(x => x.name == newName)) {
      alert(`${newName} is already added to phonebook`)

    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const addFormData = { addPerson, newName, newNumber, handleNameChange, handleNumberChange }
  const addFilterData = { filter, handleFilterChange }




  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm formData={addFilterData} />
      <AddForm formData={addFormData} />
      <DisplayNumbers persons={persons} filter={filter} />
    </div>
  )
}


export default App