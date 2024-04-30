import { useContext, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { RegisterContext } from '../../utils/RegisterContext'
import styles from './Login.module.css'
import { IoIosCloseCircleOutline } from 'react-icons/io'

const Login = () => {
  const { setshowLogin, setisLoggedIn } =
    useContext(RegisterContext)
  const [loginCreds, setLoginCreds] = useState({
    userName: '',
    password: '',
  })

  const showLogin = () => {
    setshowLogin(false)
  }

  const handleUsername = (e) => {
    setLoginCreds({ ...loginCreds, userName: e.target.value })
  }

  const handlePassword = (e) => {
    setLoginCreds({ ...loginCreds, password: e.target.value })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    axios
      .post(
        'https://swiptory-backend-production.up.railway.app/api/register/login',
        {
          userName: loginCreds?.userName,
          password: loginCreds?.password,
        }
      )
      .then((res) => {
        setisLoggedIn(true)
        localStorage.setItem('token', res?.data?.token)
        localStorage.setItem('userName', loginCreds?.userName)
        toast.success('Login successful, welcome!', {
          position: 'top-center',
        })
      })
      .catch(() => {
        toast.error('Something went wrong, please check the credentials', {
          position: 'top-center',
        })
      })
    setLoginCreds({ userName: '', password: '' })
  }

  return (
    <>
      <div id={styles.mainContainer}>
        <div id={styles.loginContainer}>
          <IoIosCloseCircleOutline
            className={styles.close}
            onClick={showLogin}
          />
          <h1>Login to SwipTory</h1>

          <form action="" method="post">
            <div>
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                name="username"
                value={loginCreds?.userName}
                placeholder="Enter username"
                onChange={handleUsername}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={loginCreds?.password}
                placeholder="Enter password"
                onChange={handlePassword}
              />
            </div>

            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
export default Login
