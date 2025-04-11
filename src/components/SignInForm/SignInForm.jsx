import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { signIn } from "../../services/authService";
import styles from './SignInForm.module.css';

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
    <main className={styles.signInMain}>
      <h1 className={styles.signInTitle}>Sign In</h1>
      <p className={styles.message}>{message}</p>
      <form className={styles.signInForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="username">username:</label>
          <input
            className={styles.formInput}
            type="text"
            id='name'
            value={formData.username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="password">password:</label>
          <input
            className={styles.formInput}
            type="text"
            id='password'
            value={formData.password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.signInButton} type='submit'>Sign In</button>
          <button className={styles.cancelButton} onClick={() => navigate('/')}>cancel</button>
        </div>
      </form>
    </main>

  )
}
  
  export default SignInForm
