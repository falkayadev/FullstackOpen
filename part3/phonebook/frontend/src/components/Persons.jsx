const Person = ({ person, onDelete }) => {
  const confirmChoice = (id) => {
    window.confirm(`Delete ${person.name}?`) && onDelete(person.id);
  };
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => confirmChoice(person.id)}>delete</button>
    </li>
  );
};

export default function People({ people, onDelete }) {
  return (
    <ul>
      {people.map((person) => (
        <Person key={person.id} person={person} onDelete={onDelete} />
      ))}
    </ul>
  );
}
