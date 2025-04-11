import { Link } from "react-router"
import styles from './BookList.module.css';

const BookList = (props) => {
    return (
        <main className={styles.listMain}>
            {props.books.map((book) => (
                <Link className={styles.bookLink} to={`/books/${book._id}`} key={book._id}>
                    <article className={styles.bookArticle}>
                        <header className={styles.bookHeader}>
                            <h2 className={styles.bookTitle}>{book.title}</h2>
                            <p className={styles.bookAuthorInfo}>
                                {`${book.author.username} posted this book on
                                ${new Date(book.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p className={styles.bookPreview}>
                            {book.text}
                        </p>
                    </article>
                </Link>
            ))}
        </main>
    )
}

export default BookList