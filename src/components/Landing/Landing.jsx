import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <h1 className={styles.title}>Welcome to BookClub</h1>
      <p className={styles.description}>
        BookClub is a straightforward app that makes 
        sharing your thoughts on books simple and rewarding. 
        This user-friendly platform allows readers to post 
        honest reviews of books they've read. 
      </p>
      <p className={styles.description}>At the top of the page you can sign in or sign up</p>
    </div>
  )
}

export default Landing