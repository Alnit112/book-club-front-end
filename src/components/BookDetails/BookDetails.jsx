import { useParams, Link } from "react-router"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../contexts/UserContext";
import * as bookService from '../../services/bookService'
import CommentForm from '../CommentForm/CommentForm';
import styles from './BookDetails.module.css';


const BookDetails = (props) => {
    const { bookId } = useParams()

    const { user } = useContext(UserContext)

    const [book, setBook] = useState(null)

    useEffect(() => {
        const fetchBook = async () => {
            const bookData = await bookService.show(bookId)

            setBook(bookData)
        }
        fetchBook()
    }, [bookId])

    const handleAddComment = async (commentFormData) => {
        const newComment = await bookService.createComment(bookId, commentFormData)
        
        setBook({ ...book, comments: [...book.comments, newComment] })
    }


    if (!book) return <main className={styles.main}>Please Wait</main>
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <header className={styles.header}>
                    <p className={styles.genreLabel}>
                        {book.genre.toUpperCase()}
                    </p>
                    <h1 className={styles.title}>
                        {book.title}
                    </h1>
                    <p className={styles.authorInfo}>
                        {`${book.author.username} posted this book on
                      ${new Date(book.createdAt).toLocaleDateString()}`}
                    </p>
                    {book.author._id === user._id && (
                        <div className={styles.actionButtons}>
                            <Link className={styles.editLink} to={`/books/${bookId}/edit`}>Edit</Link>
                            <button 
                                className={styles.deleteButton}
                                onClick={() => props.handleDeleteBook(bookId)}
                            >Remove</button>
                        </div>
                    )}
                </header>
                <p className={styles.bookText}>
                    {book.text}
                </p>
            </section>
            <section className={styles.commentsSection}>
                <h2 className={styles.commentsTitle}>Comments</h2>
                <CommentForm handleAddComment={handleAddComment} />
                {!book.comments.length && <p className={styles.noComments}>no comments</p>}
                {book.comments.length > 0 && book.comments.map((comment, idx) => (
                    <article className={styles.commentArticle} key={idx}>
                        <header className={styles.commentHeader}>
                            <p className={styles.commentAuthorInfo}>
                              {`${comment?.author?.username} posted this book on
                              ${new Date(comment.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p className={styles.commentText}>
                            {comment.text}
                        </p>
                    </article>
                ))}
            </section>
        </main>
    )
}

export default BookDetails