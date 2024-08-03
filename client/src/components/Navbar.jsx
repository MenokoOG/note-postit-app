import React from "react"
import { Link , useNavigate} from 'react-router-dom'


export default function Navbar(props) {
    const { logout, token } = props
    const navigate = useNavigate()
    function handleBack(){
        navigate(-1)
    }

    return (
        <div className="navbar">
            <h2>Sticky Notes</h2>
            {token && <Link to='/profile'></Link>}
            {token && <button onClick={handleBack}>Go Back</button>}
            {token && <button onClick={logout}>Logout</button>}
            
        </div>
    )
}