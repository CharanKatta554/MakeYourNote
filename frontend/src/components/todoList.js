import React from 'react';
import '../css/todoList.css'
const TodoList = ({ todos, onDelete }) => {
    const handleDelete = (id) => {
        fetch('http://localhost:8080/api/todo/' + id, {
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
        <><div>
            <table id="todos">
                <thead>
                    <tr>
                        <th><center>Id</center></th>
                        <th><center>Title</center></th>
                        <th><center>Description</center></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => {
                        return <tr key={index}>
                            <td><center>{todo.id}</center></td>
                            <td><center>{todo.title}</center></td>
                            <td><center>{todo.description}</center></td>
                            <td>
                                <center>
                                    <button id='delete_button' onClick={() => handleDelete(todo.id)}>Delete</button>
                                </center>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
        </>
    );
}
export default TodoList;
