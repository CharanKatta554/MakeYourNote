import { useNavigate } from 'react-router-dom'
const LogOut = () => {
    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.clear()
        localStorage.clear()
        navigate("/")
    }
    return (
        <div className='logout'>
            <button id="logOutButton" onClick={logout}>Logout</button>
        </div>
    )
}

export default LogOut