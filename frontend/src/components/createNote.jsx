import { useState } from 'react'
import "../css/createNote.css"
const CreateNote = (onCreate) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async () => {
        if (formData.name !== "" && formData.email !== "" && formData.password !== "") {
            await fetch('http://localhost:8080/api/note', {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ title: formData.title, description: formData.description })
            }).then(response => response.json())
                .then(data => {
                    onCreate(data)
                })
                .catch(err => console.log(err.message))
        }
        else {
            alert("Input fields not empty")
        }
    }

    return (
        <div className='createNote'>
            <h4>Create Note</h4>
            <form onSubmit={handleSubmit}>
                <div className='createNoteTextField'>
                    <input className='createNoteText' type="text" id="title" name="title" placeholder="Enter Title" value={formData.title} onChange={handleChange} />
                </div>
                <div className='createNoteTextField'>
                    <textarea className='createNoteText' type="text" id="description" name="description" placeholder="Write your note" value={formData.description} onChange={handleChange} />
                </div>
                <button id='createNoteButton' type="submit" value="Create">Add Note</button>
            </form>
        </div>
    )
}

export default CreateNote;