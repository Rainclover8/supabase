import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useState } from "react";
function App() {
  const supabase = createClient(
    "https://kxxfimsobrnqixzjzhtz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eGZpbXNvYnJucWl4emp6aHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxMDA1NjEsImV4cCI6MjAzOTY3NjU2MX0.Cd66h9HzQoardMHOJ07Mjwoke0826DbbkN_sBjFb4Ok"
  );
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  async function getTodo() {
    const { data } = await supabase.from("model").select("*");
    setTodos(data);
  }
  const inputHandler = (e) => {

    setText(e.target.value);
  };
  async function addTodo() {
    await supabase.from("model").insert({ title: text });
    getTodo();
  }
  async function deleteTodo(id) {
    await supabase.from("model").delete().eq("id", id);
    getTodo();
  }
  useEffect(() => {
    getTodo();
  }, []);
  return (
    <div>
      <h1>YAPILACAKLAR</h1>
      <form action="">
        <input type="text" name="" id="" onChange={inputHandler} />
        {text && <button onClick={addTodo}>Ekle</button>}
      </form>

      <div className="todo-container">
        {todos.map((task) => {
          return (
            <div className="tasks" key={task.id}>
              <h1>{task.title}</h1>
              <button onClick={() => deleteTodo(task.id)}>Sil</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
