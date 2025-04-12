const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/books`;

const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json()
    } catch (err) {
      console.log(err)
    }
  };

  const show = async (bookId) => {
    try {
      const res = await fetch(`${BASE_URL}/${bookId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      return res.json()
    } catch (err) {
      console.log(err)
    
    }
  }

  const create = async (bookFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',

        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
       },
       body: JSON.stringify(bookFormData)
      });
      return res.json()
    } catch (err) {
      console.log(err)
    }
  }

  const createComment = async (bookId, commentFormData) => {
    
    try {
      const res = await fetch(`${BASE_URL}/${bookId}/comments`, {
        method: 'POST',

        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
       },
       body: JSON.stringify(commentFormData)
      });
      return res.json()
    } catch (err) {
      console.log(err)
    }
  }

  const deleteBook = async (bookId) => {
    try {
      const res = await fetch(`${BASE_URL}/${bookId}`, {
        method: 'DELETE',

        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,},
      });
      return res.json()
    } catch (err) {
      console.log(err)
    }
  }

  const update = async (bookId, bookFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${bookId}`, {
        method: 'PUT',

        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(bookFormData)
      });
      return res.json()
    } catch (err) {
      console.log(err)
    }
  }
  
  export { 
    index,
    show,
    create,
    createComment,
    deleteBook,
    update,
  }
  