import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import notify from "../hooks/useNotification";
import useNotification from "../hooks/useNotification";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const notify = useNotification();

  const getFilteredAnecdotes = () => {
    if (filter === "") return [...anecdotes].sort((a, b) => b.votes - a.votes);
    return anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  };

  const vote = (id, content) => {
    dispatch({ type: "anecdote/vote", payload: id });
    notify(`you voted '${content}'`, dispatch);
  };
  return (
    <>
      {getFilteredAnecdotes().map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
