import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  })

 const { setUser } = useContext(UserContext)

  const handleChange = (e) => {
    setMessage('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const newUser = await signUp(formData)

      setUser(newUser)

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

  if (formData.password !== formData.passwordConf) {
    return true
  }
}

  return (
    <main>
      <h1>Sign Up</h1>
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
          <label htmlFor="confirm">confirm password</label>
          <input
            type="text"
            id='confirm'
            value={formData.passwordConf}
            name='passwordConf'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type='submit'>Sign Up</button>
          <button onClick={() => navigate('/')}>cancel</button>
        </div>
      </form>
    </main>

  )
}

export default SignUpForm