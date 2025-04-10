import { useState } from "react"

const BookForm = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        text: '',
        genre: 'fantasy'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleAddBook(formData)
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }


return (
    <main>
        <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input 
        type="text" 
        name="title"
        id="title"
        value={formData.title}
        onChange={handleChange}
        required
        />
        <label htmlFor="text">Text</label>
        <input 
        type="text" 
        name="text"
        id="text"
        value={formData.text}
        onChange={handleChange}
        required
        />
        <label htmlFor="genre">genre</label>
        <select 
        name="genre" 
        id="genre"
        value={formData.genre}
        onChange={handleChange}
        required
        >
            <option value="fantasy">fantasy</option>
            <option value="horror">horror</option>
            <option value="romance">romance</option>
            <option value="sci-fi">sci-fi</option>
            <option value="mystery">mystery</option>
            <option value="fiction">fiction</option>
            <option value="non-fiction">non-fiction</option>
            <option value="history">history</option>
            <option value="crime">crime</option>

        </select>
        <button type="submit">submit</button>
        </form>
    </main>
)
}

export default BookForm