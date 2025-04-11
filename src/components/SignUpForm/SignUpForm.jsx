import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import styles from './SignUpForm.module.css';

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
  <main className={styles.signUpMain}>
    <h1 className={styles.signUpTitle}>Sign Up</h1>
    <p className={styles.message}>{message}</p>
    <form className={styles.signUpForm} onSubmit={handleSubmit}>
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
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="confirm">confirm password</label>
        <input
          className={styles.formInput}
          type="text"
          id='confirm'
          value={formData.passwordConf}
          name='passwordConf'
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.signUpButton} type='submit'>Sign Up</button>
        <button className={styles.cancelButton} onClick={() => navigate('/')}>cancel</button>
      </div>
    </form>
  </main>
)
}

export default SignUpForm