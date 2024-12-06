const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      {props.course.parts.map((part, i) => {
        return <Part key={i} part={part.part} exercise={part.exercise} />;
      })}
    </>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.course.parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercise,
        0
      )}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { part: "Fundamentals of React", exercise: 10 },
      { part: "Using props to pass data", exercise: 7 },
      { part: "State of a component", exercise: 14 },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
