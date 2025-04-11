import { Link } from "react-router"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import styles from './NavBar.module.css'

const NavBar = () => {
    const { user, setUser } = useContext(UserContext)

    const handleSignOut = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <nav className={styles.navBar}>
            {user ? (
                <ul className={styles.navList}>
                    <li className={styles.navItem}>Book Club</li>
                    <li className={styles.navItem}><Link className={styles.navLink} to='/' onClick={handleSignOut}>Sign Out</Link></li>
                    <li className={styles.navItem}><Link className={styles.navLink} to='/'>Home</Link></li>
                    <li className={styles.navItem}><Link className={styles.navLink} to='/books/new'>New Book</Link></li>
                    <li className={styles.navItem}><Link className={styles.navLink} to='/books'>Books</Link></li>
                </ul>
            ) : (
                <ul className={styles.navList}>
                    <li className={styles.navItem}><Link className={styles.navLink} to='/'>Home</Link></li>
                    <li className={styles.navItem}><Link className={styles.navLink} to='/sign-up'>Sign up</Link></li>
                    <li className={styles.navItem}><Link className={styles.navLink} to='/sign-in'>Sign in</Link></li>
                </ul>
            )}
        </nav>
    )
}

export default NavBar           