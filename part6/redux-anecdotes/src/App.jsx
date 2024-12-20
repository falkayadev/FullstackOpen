import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import FilterForm from "./components/FilterForm";
import Notification from "./components/Notification";
import { useSelector } from "react-redux";

const App = () => {
  const notification = useSelector((state) => state.notification);
  return (
    <div>
      <h2>Anecdotes</h2>
      {notification && <Notification />}
      <FilterForm />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
