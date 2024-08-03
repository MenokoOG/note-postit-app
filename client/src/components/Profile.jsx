import React, { useContext, useEffect } from "react"
import { UserContext } from "../context/UserProvider"
import NoteForm from "./NoteForm"
import NoteList from "./NoteList"


export default function Profile(){
    const {
        user: {username},
        notes,
        addNote,
        getAllNotes,
    } = useContext(UserContext)
    
    //will only run axios req if notes arr is empty 
    useEffect(() => {
        if(notes.length === 0) {
            getAllNotes()
        }
    }, [])
    
    return(
        <div>
            <h1 className="profile-header">Welcome Back, @{username}!</h1>
            <div className="note-container">
            <h3>New Note:</h3>
            <NoteForm addNote = {addNote}/>
            <NoteList notes = {notes} />
            </div>
        </div>
    )
}