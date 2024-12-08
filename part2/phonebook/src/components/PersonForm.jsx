import React from "react";

function FormInput({ labelText, inputName, value, onChange }) {
  return (
    <div>
      <label htmlFor={inputName}>{labelText}</label>
      <input type="text" name={inputName} value={value} onChange={onChange} />
    </div>
  );
}

export default function PersonForm({
  onCreate,
  name,
  onChangeName,
  number,
  onChangeNumber,
}) {
  return (
    <>
      <form onSubmit={onCreate}>
        <FormInput
          labelText="name:"
          inputName="name"
          value={name}
          onChange={onChangeName}
        />
        <FormInput
          labelText="number:"
          inputName="number"
          value={number}
          onChange={onChangeNumber}
        />
        <button type="submit">add</button>
      </form>
    </>
  );
}
