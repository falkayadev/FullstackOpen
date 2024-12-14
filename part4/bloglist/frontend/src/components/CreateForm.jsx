import { useState } from "react";

const CreateForm = ({ createBlog, onChange, input }) => {
  return (
    <form onSubmit={createBlog}>
      <div>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          name="title"
          value={input.title}
          onChange={onChange.title}
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          type="text"
          name="author"
          value={input.author}
          onChange={onChange.author}
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input
          type="text"
          name="url"
          value={input.url}
          onChange={onChange.url}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};
export default CreateForm;
