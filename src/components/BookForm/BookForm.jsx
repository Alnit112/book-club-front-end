import { useState, useEffect } from "react"
import { useParams } from "react-router"
import styles from './BookForm.module.css';

import * as bookService from "../../services/bookService"

const BookForm = (props) => {
    const { bookId } = useParams()
    const [formData, setFormData] = useState({
        title: '',
        text: '',
        genre: 'fantasy'
    })

    useEffect(() => {
        const fetchBook = async () => {
            const bookData = await bookService.show(bookId)
            setFormData(bookData)
        }
        if (bookId) fetchBook()
            return () => setFormData({ title: '', text: '', genre: 'fantasy' })
    }, [bookId])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (bookId) {
            props.handleUpdateBook(bookId, formData)
        } else {
        props.handleAddBook(formData)
    }}

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    return (
        <main className={styles.formMain}>
            <h1 className={styles.formTitle}>{bookId ? 'Edit Book' : 'New Book'}</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="title">Title</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="text">Text</label>
                    <textarea
                        className={styles.formTextarea}
                        name="text"
                        id="text"
                        value={formData.text}
                        onChange={handleChange}
                        required
                        rows="6"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="genre">Genre</label>
                    <select
                        className={styles.formSelect}
                        name="genre"
                        id="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    >
                        <option value="fantasy">Fantasy</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-Fi</option>
                        <option value="mystery">Mystery</option>
                        <option value="fiction">Fiction</option>
                        <option value="non-fiction">Non-Fiction</option>
                        <option value="history">History</option>
                        <option value="crime">Crime</option>
                    </select>
                </div>
                <button className={styles.submitButton} type="submit">Submit</button>
            </form>
        </main>
    );
}

export default BookForm