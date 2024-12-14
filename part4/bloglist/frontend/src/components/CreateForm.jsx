import { useState } from "react";

const CreateForm = ({ createBlog, onChange, inputs }) => {
  return (
    <form onSubmit={createBlog}>
      <div>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          name="title"
          value={inputs.title}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          type="text"
          name="author"
          value={inputs.author}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input type="text" name="url" value={inputs.url} onChange={onChange} />
      </div>
      <button type="submit">create</button>
    </form>
  );
};
export default CreateForm;
