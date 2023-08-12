import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/userLogin.css"

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
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
        if (formData.email !== "" && formData.password !== "") {
            await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email: formData.email, password: formData.password })
            }).then(response => response.json())
                .then(data => {
                    if (data.message === "Wrong password!" || data.message === "Content can not be empty!") {
                        alert(data.message)
                    }
                    else if (data.message === "Please Registered!") {
                        navigate("/register")
                    }
                    else {
                        localStorage.setItem("token", data.token);
                        navigate("/documents")
                    }
                }).catch(err => console.log(err.message))
        }
        else {
            alert("input fields not empty")
        }
    }

    return (
        <center>
            <div class="login-page">
                <div class="login-header">
                    <h4>LOGIN</h4>
                    <p>Please enter your credentials to login.</p>
                </div>
                <form class="login-form" onSubmit={handleSubmit}>
                    <div class="loginTextField">
                        <label htmlFor="email">Email:</label>
                        <input class="loginText" type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div class="loginTextField">
                        <label htmlFor="password">Password:</label>
                        <input class="loginText" type="text" id="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>

                    <button id='login-button' type="submit">Login</button>

                    <p class="message">Not registered? <a href="/register">Create an account</a></p>
                </form>
            </div>
        </center>
    )
}

export default Login;