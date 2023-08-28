import React from 'react';
import '../css/listOfNotes.css'
const NoteList = ({ notes, onDelete }) => {
    const handleDelete = (id) => {
        fetch('http://localhost:8080/api/note/' + id, {
            method: 'delete'
        }).then((res) => {
            onDelete(id);
        })
            .catch(
                err => {
                    console.log(err)
                })
    }

    return (
        <>
            <div>
                {notes.toReversed().map((note, index) => {
                    return <div class="note">

                        <center>
                            <h3><b>{note.title}</b></h3>
                        </center>
                        <div class='content'>
                            <p>{note.description}</p>
                            <p id='date'>{note.createdAt}</p>
                            <div class="delete">
                                <button id='delete_button' onClick={() => handleDelete(note.id)}>Delete</button>
                            </div>
                            {/* <button id='edit_button' onClick={() => handleEdit(note.id)}>Delete</button> */}
                        </div>
                    </div>
                })}

            </div>
        </>)
}
export default NoteList;
