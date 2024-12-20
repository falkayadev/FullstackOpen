import { useDispatch } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import useNotification from "../hooks/useNotification";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const notify = useNotification();
  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    dispatch(create(content));
    notify(`you created '${content}'`, dispatch);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
