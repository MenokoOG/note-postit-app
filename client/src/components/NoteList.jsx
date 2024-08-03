import React from "react"
import Note from "./Note"


export default function NoteList(props) {
    const { notes } = props


    if (!Array.isArray(notes)|| !notes.length) {
        return (
            <div className="first-note">
                <h1>...Add your first note!</h1>
                <img src='https://media4.giphy.com/media/E49kBZAG5miKh9pJtP/giphy.webp?cid=ecf05e47gku4jznam1dqom4xxb4eqefdthn5se25mh9wft7x&ep=v1_gifs_search&rid=giphy.webp&ct=g' className="first-img" />
                    </div>
        )
    }

    // if(!notes) {
    //     return (
    //         <div>...Loading</div>
    //     )
    // }


    // console.log(typeof(notes)) //why is it returning an object not arr 
    return (
        <div className="note-list">
            {/* <Note /> */}
            {notes.map(note => (
                <Note {...note} key={note._id} /> ))}
            {/*   {notes.map(note => note ? <Note {...note} key={note._id} /> : null)} */}
        </div>
    )
}