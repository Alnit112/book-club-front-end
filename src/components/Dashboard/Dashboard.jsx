import { useContext } from "react";
import { useEffect } from "react";
import * as userService from "../../services/userService";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = () => {
    const { user } = useContext(UserContext)

    useEffect (() => {
        const fetchUser = async () => {
            try {
                const ffetchedUsers = await userService.index()
                console.log(ffetchedUsers)
            } catch (err) {
                console.log(err)
            }
        }
        if (user) fetchUser()
    }, [user])

    return (
        <main>
            <h1>Dashboard</h1>
            <p>Welcome, {user.username}</p>
        </main>
    )
}

export default Dashboard