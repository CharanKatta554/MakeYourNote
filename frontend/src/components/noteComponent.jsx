import { useState, useEffect } from 'react';
import jwt from 'jwt-decode'
import TodoList from './listOfNotes';
import CreateNote from './createNote';
import "../css/noteComponent.css"
import Header from './header';

const NoteComponent = () => {
    const [todoList, setTodoList] = useState([])
    const token = localStorage.getItem("token");
    const user = jwt(token)
    const name = user.results.name
    useEffect(() => {
        const fetchData = async () => {
            await fetch('http://localhost:8080/api/note',
                { headers: { 'authorization': `Bearer ${token}` } }
            )
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setTodoList(data)
                })
        }; fetchData();
    }, [])

    const onCreate = (todo) => {
        let newList = todoList;
        newList.push(todo);
        setTodoList(newList)
    }

    const onDelete = (id) => {
        const newList = todoList.filter(todo => todo.id !== id);
        setTodoList(newList)
    }

    return (
        <div>
            <Header></Header>
            <div id="userName">
                <h2>{name}</h2>
            </div>
            <CreateNote onCreate={onCreate} />
            <TodoList todos={todoList} onDelete={onDelete} />
        </div>
    )
}

export default NoteComponent;