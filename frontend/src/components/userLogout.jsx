import { useNavigate } from 'react-router-dom'
import "../css/userLogOut.css"
const LogOut = () => {
    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.clear()
        localStorage.clear()
        navigate("/")
    }
    return (
        <div>
            <button id="logOutButton" onClick={logout}>Logout</button>
        </div>
    )
}

export default LogOut