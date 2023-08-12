import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../components/userLogin';
import Register from '../components/userRegister';
import CreateTodo from './createNote';
import NoteComponent from './noteComponent';

const Home = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/documents" element={<NoteComponent />} />
                <Route path="/createNote" element={<CreateTodo />} />
            </Routes>

        </div>
    )
}
export default Home;