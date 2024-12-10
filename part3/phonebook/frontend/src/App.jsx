import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import dbConnection from './services/dbConnection'
import Notification from './components/Notification'
const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({})

  useEffect(() => {
    dbConnection.getAll().then((data) => {
      console.log('effect')
      setPeople(data)
    })
  }, [])

  const filteredPeople = people.filter((person) =>
    person && person.name ? person.name.includes(filter) : false
  )

  // sub function of submit
  const handleUpdate = (id, newPerson) => {
    dbConnection
      .update(id, newPerson)
      .then((updatedPerson) => {
        notify('success', `Updated ${newName}`)
        setPeople(
          people.map((person) => (person.id === id ? updatedPerson : person))
        )
      })
      .catch((error) => {
        notify('error', error.response.data.error)
      })
  }
  // sub function of submit
  const handleCreate = (newPerson) => {
    dbConnection
      .create(newPerson)
      .then((data) => {
        console.log(data)
        notify('success', `Added ${data.name}`)
        setPeople([...people, data])
        console.log(people)
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
        notify('error', error.response.data.error)
      })
  }
  // main function
  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    const existingPerson = people.find((person) => person.name === newName)
    if (existingPerson) {
      const confirmChoice = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (confirmChoice) {
        handleUpdate(existingPerson.id, newPerson)
      }
    } else {
      handleCreate(newPerson)
    }
  }
  // main function
  const handleDelete = (id) => {
    dbConnection
      .remove(id)
      .then((data) => {
        console.log(data)
        notify('success', `Deleted ${data.name}`)
        setPeople(people.filter((person) => person.id !== data.id))
      })
      .catch(() => {
        const person = people.find((person) => person.id === id)
        notify(
          'error',
          `the person ${person.name} was already deleted from server`
        )
        setPeople(people.filter((person) => person.id !== id))
      })
  }
  // input eventHandler
  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }
  // input eventHandler
  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }
  // inputEventFandler
  const handleFilter = (e) => {
    setFilter(e.target.value)
  }
  // Frontend error handler
  const notify = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification notification={notification} />}
      <Filter value={filter} onChange={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleSubmit}
        name={newName}
        number={newNumber}
        onChangeName={handleChangeName}
        onChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons people={filteredPeople} onDelete={handleDelete} />
      {/* <div>
        debug: {newName ? newName : "Empty Input"} {JSON.stringify(people)}
      </div> */}
    </div>
  )
}

export default App
