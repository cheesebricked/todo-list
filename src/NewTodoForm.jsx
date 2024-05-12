import { useState } from "react"

export function NewTodoForm(props) {

    const [newItem, setNewItem] = useState("") // returns a list of 2 things, a value, and a function to update our value

    function handleSubmit(e) {
        e.preventDefault()    // prevents refreshing the page on form submit

        if (newItem === "") { return }
    
        props.onSubmit(newItem)     // get information from props. name must be the same as what was passed down
    
        setNewItem("")
      }

    return (
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
    )
}