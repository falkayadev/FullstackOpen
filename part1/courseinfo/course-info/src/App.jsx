const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, i) => {
        return <Part key={i} part={part.part} exercise={part.exercise} />;
      })}
    </>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercise,
        0
      )}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    { part: "Fundamentals of React", exercise: 10 },
    { part: "Using props to pass data", exercise: 7 },
    { part: "State of a component", exercise: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
