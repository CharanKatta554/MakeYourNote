import React from 'react';
import '../css/listOfNotes.css'
const TodoList = ({ todos, onDelete }) => {
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
                {todos.map((todo, index) => {
                    return <div class="note">

                        <center>
                            <h3><b>{todo.title}</b></h3>
                        </center>
                        <div class='content'>
                            <p>{todo.description}</p>
                            <p id='date'>{todo.createdAt}</p>
                            <div class="delete">
                                <button id='delete_button' onClick={() => handleDelete(todo.id)}>Delete</button>
                            </div>
                            {/* <button id='edit_button' onClick={() => handleEdit(todo.id)}>Delete</button> */}
                        </div>
                    </div>
                })}

            </div>
        </>)
}
export default TodoList;
