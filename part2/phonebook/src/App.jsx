import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const filteredPersons = persons.filter((person) =>
    person.name.includes(filter)
  );

  const handleSubmit = (e) => {
    const isAlreadyExist = persons.some((person) => person.name === newName);
    if (isAlreadyExist) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    e.preventDefault();
    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      })
    );
    setNewName("");
    setNewNumber("");
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={filteredPersons} />
      {/* <div>
        debug: {newName ? newName : "Empty Input"} {JSON.stringify(persons)}
      </div> */}
    </div>
  );
};

export default App;
