import { useState, useEffect } from 'react';
import jwt from 'jwt-decode'
import NoteList from './listOfNotes';
import CreateNote from './createNote';
import "../css/noteComponent.css"
import Header from './header';

const NoteComponent = () => {
    const [noteList, setNoteList] = useState([])
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
                    setNoteList(data)
                })
        }; fetchData();
    }, [])

    const onCreate = (note) => {
        let newList = noteList;
        newList.push(note);
        setNoteList(newList)
    }

    const onDelete = (id) => {
        const newList = noteList.filter(note => note.id !== id);
        setNoteList(newList)
    }

    return (
        <div>
            <Header></Header>
            <div id="userName">
                <h2>{name}</h2>
            </div>
            <CreateNote onCreate={onCreate} />
            <NoteList notes={noteList} onDelete={onDelete} />
        </div>
    )
}

export default NoteComponent;