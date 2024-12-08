import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import dbConnection from "./services/dbConnection";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    dbConnection.getAll().then((response) => {
      console.log("effect");
      setPersons(response.data);
    });
  }, []);

  const filteredPersons =
    persons.length > 0
      ? persons.filter((person) => person.name.includes(filter))
      : [];

  const handleCreate = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const confirmChoice = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmChoice) {
        dbConnection.update(existingPerson.id, newPerson).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === existingPerson.id
                ? { ...person, number: newNumber }
                : person
            )
          );
          notify(`Updated ${newName}`);
        });
      }
    } else {
      dbConnection.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
        notify(`Added ${newName}`);
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    dbConnection.remove(id).then((response) => {
      setPersons(persons.filter((person) => person.id !== response.data.id));
      notify(`Deleted ${response.data.name}`);
    });
  };

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const notify = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification message={notification} />}
      <Filter value={filter} onChange={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        onCreate={handleCreate}
        name={newName}
        number={newNumber}
        onChangeName={handleChangeName}
        onChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
      {/* <div>
        debug: {newName ? newName : "Empty Input"} {JSON.stringify(persons)}
      </div> */}
    </div>
  );
};

export default App;
