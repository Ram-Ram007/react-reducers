
import EditForm from "./editForm";
const TodoList = ({ todos, handleDelete, handleEdit, handleDone,handleUpdate }) => {
  function handleCheck(e, id) {
    
    let type = "done";
    if (!e.target.checked) {
      type = "undone";
    }
    handleDone(id, type);
  }
  return (
    <div>
      <h1>My todos</h1>
      <div>
       {todos.map((t) => (
  <div key={t.id} className={t.isDone ? "strikethrough" : ""}>
    {t.isEdit ? (
      <EditForm
        text={t.text} // Pass the text to be edited
        onSave={(newText) => handleUpdate(t.id, newText)} // Pass a function to save the changes
      />
    ) : (
      // Display the item as it is
      <>
        <input
          type="checkbox"
          name=""
          id=""
          checked={t.isDone}
          onChange={(e) => handleCheck(e, t.id)}
        />
        {t.text}
        <button onClick={() => handleDelete(t.id)}>Delete</button>
        <button onClick={() => handleEdit(t.id)}>Edit</button>
      </>
    )}
  </div>
))}
      </div>
    </div>
  );
};

export default TodoList;
