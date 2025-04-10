import { useParams } from "react-router"
import { useState, useEffect, useContext } from "react"
import { UserContext} from "../../contexts/UserContext";
import * as bookService from '../../services/bookService'
import CommentForm from '../CommentForm/CommentForm';


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
        setBook({...book, comments: [...book.comments, newComment] })
    }


    if (!book) return <main>Please Wait</main>

    return (
        <main>
            <section>
                <header>
                    <p>
                        {book.genre.toUpperCase()}
                    </p>
                    <h1>
                        {book.title}
                    </h1>
                    <p>
                      {`${book.author.username} posted this book on 
                      ${new Date(book.createdAt).toLocaleDateString()}`}
                    </p>
                    {book.author._id === user._id && (
                        <>
                        <button onClick={() => props.handleDeleteBook(bookId)}
                        >Remove</button>
                        </>
                    )}
                </header>
                <p>
                    {book.text}
                </p>
            </section>
            <section>
                <h2>Comments</h2>
                <CommentForm handleAddComment={handleAddComment} />

                {!book.comments.length && <p>no comments</p>}

                {book.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <p>
                              {`${comment.author.username} posted this book on 
                              ${new Date(comment.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p>
                            {comment.text}
                        </p>
                    </article>
                ))}
            </section>
        </main>
    )
}

export default BookDetails