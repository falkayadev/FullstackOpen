import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;
