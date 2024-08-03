import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import moment from 'moment'
import EditForm from './EditForm';

export default function NoteDetails() {
    const navigate = useNavigate()
    // const { createdAt, inputs, title, description, } = props
    const { notes, getAllNotes, deleteNote, updateNote } = useContext(UserContext)
    const { noteId } = useParams()
    const foundNote = notes.find(note => noteId === note._id)
    const timeStamp = foundNote && foundNote.createdAt ? moment(foundNote.createdAt).fromNow() : '';
    const [isEditing, setIsEditing] = useState(false)

    //will only fire if foundNote is undefined(false value) 
    useEffect(() => {
        if (!foundNote) {
            getAllNotes()
        }
    }, [])

    if (!foundNote) {
        return <div></div>
    }

    function handleDelete() {
        console.log('this is the handleDelete in note details')
        deleteNote(noteId)
        navigate('/profile')
    }

    function handleIsEditing() {
        setIsEditing(prev => !prev)
    }

    console.log(foundNote)

    return (
        // this allows the two forms to toggle
        <div>
            <div>
                <div className='editing-note'>
                    <h2>{foundNote.title.toUpperCase()}</h2>
                    <h2>{foundNote.description}</h2>
                    <p>{timeStamp}</p>
                </div>
                <button onClick={handleIsEditing}>Edit</button>
                {/* if del navigate back to profile */}
                <button onClick={handleDelete}>Delete</button>
            </div>

            {isEditing && <EditForm
                input={{ title: foundNote.title, description: foundNote.description }}
                handleIsEditing={handleIsEditing}
                noteId={foundNote._id}
                timeStamp={timeStamp}
            />
            }
            {/* <img src='https://media2.giphy.com/media/9xmjP6FkdINCA6Ucp4/200.webp?cid=790b7611gg2iuw9ve9gebd4l28jellqk5ufz9qtntgr5bk9z&ep=v1_gifs_search&rid=200.webp&ct=g'/> */}
        </div>
    )
}


{/* //axios req for edit and del 
//styling: 

//in note details? 
//build edit form and 
// update state 
    //formdata
    //isediting
//decide which for to desiplay 
//after you get state figure out which form you will need 
//on handle submit hten we pass in our edit issue 
//have ternary to eidt data or view data

//once that is working then we can do the handle edit  */}
