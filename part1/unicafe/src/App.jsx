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
  const all = good + bad + neutral;
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;
  return (
    <>
      <Title text="statistics" />
      <Stat text="good" value={good} />
      <Stat text="neutral" value={neutral} />
      <Stat text="bad" value={bad} />
      <Stat text="all" value={all} />
      <Stat text="average" value={average} />
      <Stat text="positive" value={positive} />
    </>
  );
};

const Stat = ({ text, value }) => {
  return (
    <p>
      {text} {text === "positive" ? value + "%" : value}
    </p>
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
