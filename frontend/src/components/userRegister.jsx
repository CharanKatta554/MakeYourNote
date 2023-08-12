import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/userRegister.css"

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.name !== "" && formData.email !== "" && formData.password !== "") {
            await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password })
            }).then(response => response.json())
                .then(data => navigate("/"))
                .catch(err => console.log(err.message))
        }
        else {
            alert("Input fields not emapty")
        }
    }

    return (
        <center>
            <div class="register-page">
                <div class="register-header">
                    <h4>Register</h4>
                </div>
                <form class="register-form" onSubmit={handleSubmit}>
                    <div class="registerTextField">
                        <label htmlFor="name">Name:</label>
                        <input class="registerText" type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div class="registerTextField">
                        <label htmlFor="email">Email:</label>
                        <input class="registerText" type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div class="registerTextField">
                        <label htmlFor="password">Password:</label>
                        <input class="registerText" type="text" id="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <button id='register-button' type="submit">Register</button>
                    <p class="message"><a href="/">Back</a></p>
                </form>
            </div>
        </center >
    )
}

export default Register;