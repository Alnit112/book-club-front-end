import { useContext } from "react";
import { useEffect } from "react";
import * as userService from "../../services/userService";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router";
import styles from './Dashboard.module.css';


const Dashboard = () => {
    const { user } = useContext(UserContext)

    useEffect (() => {
        const fetchUser = async () => {
            try {
                const fetchedUsers = await userService.index()
    
            } catch (err) {
                console.log(err);
            }
        }
        if (user) fetchUser()
    }, [user])

    return (
        <main className={styles.dashboardContainer}>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.description}>Welcome {user.username}</p>
            <ul className={styles.description}>
                <li>If you would like to create a book then you can click on the New Book Button </li>
                <li>If you would like to look at all the books that have been posted click the Books button</li>
                <li>If you are the owner of a Book you can edit it and remove it</li>            
            </ul>
            <Link className={styles.review} to='/books'>Review books</Link>
        </main>
    )
}

export default Dashboard