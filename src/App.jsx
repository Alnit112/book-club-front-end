import { useContext, useState, useEffect } from "react"

import { Route, Routes, useNavigate } from "react-router"

import NavBar from "./components/NavBar/NavBar"
import SignUpForm from "./components/SignUpForm/SignUpForm"
import SignInForm from "./components/SignInForm/SignInForm"
import Dashboard from "./components/Dashboard/Dashboard"
import Landing from "./components/Landing/Landing"
import BookList from "./components/BookList/BookList"
import BookDetails from "./components/BookDetails/BookDetails"


import * as bookService from "./services/bookService"
import { UserContext } from "./contexts/UserContext"
import BookForm from "./components/BookForm/BookForm"


const App = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const [books, setBooks] = useState([])

  useEffect (() => {
    const fetchAllBooks = async () => {
      const booksData = await bookService.index()

      setBooks(booksData)
    }
    if (user) fetchAllBooks()
  }
  , [user])

  const handleAddBook = async (bookFormData) => {
    const newBook = await bookService.create(bookFormData)

    setBooks([newBook, ...books])

    navigate('/books')
  }

  const handleDeleteBook = async (bookId) => {
    setBooks(books.filter((book) => book._id !== bookId))
    navigate('/books')
    
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path="/books" element={<BookList books={books} />} />
            <Route path="/books/:bookId" element={<BookDetails handleDeleteBook={handleDeleteBook} />} />
            <Route path='/books/new' element={<BookForm handleAddBook={handleAddBook}/>} />
          </>
        ) : (
         <>
            <Route path ='/sign-up' element ={<SignUpForm />} />
            <Route path ='/sign-in' element={<SignInForm />} />
         </>
        )}
    </Routes >
    </>
  )
}

export default App
