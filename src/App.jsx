import { useState } from "react"
import "./styles.css"

export default function App() {
  const [newItem, setNewItem] = useState("") // returns a list of 2 things, a value, and a function to update our value
  const [todos, setTodos] = useState([])

  function handleSubmit(e) {
    e.preventDefault()    // prevents refreshing the page on form submit

    // use current<Thing> to get the current state of something in our application
    setTodos((currentTodos) => {
        return [...currentTodos, { id: crypto.randomUUID(), title: newItem, completed: false }]   //crypto.randopmUUID() reades a new unique identifier
      }
    )

    setNewItem("")
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id == id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => 
        todo.id !== id
      )
    })
  }

  return (
    <>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input value={newItem} 
                  onChange={e => setNewItem(e.target.value)}
                  type="text" 
                  id="item"/> {/* e is an event */}
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "No todos"}
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input type="checkbox" checked={todo.completed} 
                onChange={e => toggleTodo(todo.id, e.target.checked)}/>
                {todo.title}
              </label>
              <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
