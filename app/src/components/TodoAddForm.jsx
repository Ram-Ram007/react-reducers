import { useState } from "react";

const TodoAddForm = ({ handleAdd }) => {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    handleAdd(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          required
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoAddForm;
