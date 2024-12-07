const Total = (props) => {
  return (
    <b>
      total of{" "}
      {props.course.parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises,
        0
      )}{" "}
      exercises
    </b>
  );
};

export default Total;
