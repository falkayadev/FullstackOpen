import Part from "./Part";

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part, i) => {
        return (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        );
      })}
    </>
  );
};

export default Content;
