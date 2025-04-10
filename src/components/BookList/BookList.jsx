import { Link } from "react-router"

const BookList = (props) => {
    return (
        <main>
            {props.books.map((book) => (
                <Link to={`/books/${book._id}`} key={book._id}>
                    <article>
                        <header>
                            <h2>{book.title}</h2>
                            <p>
                                {`${book.author.username} posted this book on 
                                ${new Date(book.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p>
                            {book.text}
                        </p>
                    </article>
                </Link>
            ))}
        </main>
    )
}

export default BookList