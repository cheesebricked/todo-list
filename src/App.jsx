import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"

export default function App() {

  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEM")
    if (localValue == null) {return []}
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEM", JSON.stringify(todos))
  }, [todos])     // everytime something in the property in our list changes, run this function

  function addTodo(title) {
      // use current<Thing> to get the current state of something in our application
      setTodos((currentTodos) => {
        return [...currentTodos, { id: crypto.randomUUID(), title, completed: false }]   //crypto.randopmUUID() reades a new unique identifier
      }
    )
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
      <NewTodoForm onSubmit={addTodo} />   {/* onSubmit is a prop. it passes something down to the component. */}
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  )
}
