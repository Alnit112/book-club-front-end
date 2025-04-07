import { Link } from "react-router"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"

const NavBar = () => {
    const { user, setUser } = useContext(UserContext)

    const handleSignOut = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <nav>
            {user ? (
                <ul>
                    <li>
                        welcome, {user.username}
                    </li>
                    <li>
                        <Link to='/' onClick={handleSignOut}>Sign Out</Link>
                    </li>
                </ul>
            ) : (
                <ul>
                    <li><Link to='/sign-up'>Sign up</Link></li>
                </ul>
            )}
        </nav>
    )
}

export default NavBar           