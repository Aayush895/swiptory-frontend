import { useContext, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RegisterContext } from '../../utils/RegisterContext'
import styles from './Register.module.css'
import { IoIosCloseCircleOutline } from 'react-icons/io'

const Register = () => {
  const { setshowRegister } = useContext(RegisterContext)
  const [userInfo, setuserInfo] = useState({
    userName: '',
    email: '',
    password: '',
  })

  const handleUsername = (e) => {
    setuserInfo({ ...userInfo, userName: e.target.value })
  }

  const handleEmail = (e) => {
    setuserInfo({ ...userInfo, email: e.target.value })
  }

  const handlePass = (e) => {
    setuserInfo({ ...userInfo, password: e.target.value })
  }

  const handleRegister = () => {
    setshowRegister(false)
  }

  const handleSignup = (e) => {
    e.preventDefault()
    axios.post(
      'https://swiptory-backend-production.up.railway.app/api/register/signup',
      {
        userName: userInfo?.userName,
        email: userInfo?.email,
        password: userInfo?.password,
      }
    )

    toast.success('Registeration was successful, please login!', {
      position: 'top-center',
    })
    setuserInfo({ userName: '', email: '', password: '' })
  }

  return (
    <>
      <div id={styles.mainContainer}>
        <div id={styles.registerContainer}>
          <IoIosCloseCircleOutline
            className={styles.close}
            onClick={handleRegister}
          />
          <h1>Register to SwipTory</h1>

          <form action="" method="post">
            <div>
              <label htmlFor="userName">Username:</label>
              <input
                type="text"
                name="userName"
                placeholder="Enter username"
                value={userInfo?.userName}
                onChange={handleUsername}
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={userInfo?.email}
                onChange={handleEmail}
              />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={userInfo?.password}
                onChange={handlePass}
              />
            </div>

            <button type="submit" onClick={handleSignup}>
              Register
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
export default Register
