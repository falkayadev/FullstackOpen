import { useState } from "react";

const Persons = ({ persons }) => (
  <ul>
    {persons.map((person) => (
      <Person key={person.name} person={person} />
    ))}
  </ul>
);

const Person = ({ person }) => <li>{person.name}</li>;

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
      <div>
        debug: {newName ? newName : "Empty Input"} {JSON.stringify(persons)}
      </div>
    </div>
  );
};

export default App;
