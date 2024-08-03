import React, { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../context/UserProvider"



export default function EditForm(props) {
    const { input, handleIsEditing, noteId } = props
    const { updateNote } = useContext(UserContext)

    const [inputs, setInputs] = useState({
        title: input.title || "",
        description: input.description || ""
    })


    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleEditedNote(e) {
        e.preventDefault()
        updateNote(noteId, inputs)
        handleIsEditing()
    }


    return (
        <div>
            <form>
                <label>Title:
                    <input
                        type="text"
                        placeholder="New Title"
                        name="title"
                        value={inputs.title}
                        onChange={handleChange}
                    />
                </label>
                <label> Description:
                <input
                    type="text"
                    placeholder="New Description"
                    name="description"
                    value={inputs.description}
                    onChange={handleChange}
                    />
                    </label>
                <button onClick={handleEditedNote}>Update Note</button>
                <button onClick={handleIsEditing}>Cancel Changes</button>
            </form>
        </div>
    )
}

