import { useState } from "react";

const Title = ({ text }) => {
  return <h2>{text}</h2>;
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Feedback = ({ onGoodFeedback, onBadFeedback, onNeutralFeedback }) => {
  return (
    <>
      <Title text="give feedback" />
      <div>
        <Button text="good" onClick={onGoodFeedback} />
        <Button text="neutral" onClick={onNeutralFeedback} />
        <Button text="bad" onClick={onBadFeedback} />
      </div>
    </>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  return (
    <>
      <Title text="statistics" />
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodFeedback = () => {
    setGood(good + 1);
  };

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1);
  };

  const handleBadFeedback = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Feedback
        onGoodFeedback={handleGoodFeedback}
        onNeutralFeedback={handleNeutralFeedback}
        onBadFeedback={handleBadFeedback}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
