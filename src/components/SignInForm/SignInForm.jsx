import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { signIn } from "../../services/authService";

const SignInForm = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    })
  
   const { setUser } = useContext(UserContext)
  
    const handleChange = (e) => {
      setMessage('')
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      
      try {
        const signedInUser = await signIn(formData)
  
        setUser(signedInUser)
  
        navigate('/')
      } catch (err) {
        setMessage(err.message)
  
      }
    }
  
    const isFormInvalid = async (e) => {
      if (formData.username === ''){
        return true
    }
  
    if (formData.password === '') {
      return true
    }
  }
  
    return (
      <main>
        <h1>Sign In</h1>
        <p>{message}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">username:</label>
            <input
              type="text"
              id='name'
              value={formData.username}
              name='username'
              onChange={handleChange}
              required
            />
          </div>
  
          <div>
            <label htmlFor="password">password:</label>
            <input
              type="text"
              id='password'
              value={formData.password}
              name='password'
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type='submit'>Sign In</button>
            <button onClick={() => navigate('/')}>cancel</button>
          </div>
        </form>
      </main>
  
    )
  }
  
  export default SignInForm
