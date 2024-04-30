/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import { RegisterContext } from '../utils/RegisterContext'
import styles from './NavBar.module.css'
import { RxHamburgerMenu } from 'react-icons/rx'
import { StoryContext } from '../utils/StoryContext'

const NavBar = ({ setshowCreateStory }) => {
  const { setshowRegister, setshowLogin, isLoggedIn, setisLoggedIn } = useContext(RegisterContext)
  const { setIsEdit, setpostInfo } = useContext(StoryContext)
  const [showLogout, setshowLogout] = useState(false)

  const handleRegister = () => {
    setshowRegister(true)
  }

  const handleLogin = () => {
    setshowLogin(true)
  }

  const handleShowlogout = () => {
    setshowLogout(!showLogout)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    setisLoggedIn(false)
    setshowLogout(false)
  }

  const handleShowCreateStory = () => {
    setIsEdit(false)
    setshowCreateStory(true)
    setpostInfo({
      heading: '',
      desc: '',
      image: '',
      category: '',
    })
  }

  return (
    <div id={styles.navContainer}>
      <div id={styles.navHeader}>
        <h1>SwipTory</h1>
      </div>
      <div id={styles.navItems}>
        <ul>
          {!isLoggedIn ? (
            <>
              <li>
                <button type="submit" onClick={handleRegister}>
                  Register Now
                </button>
              </li>
              <li>
                <button type="submit" onClick={handleLogin}>
                  Sign In
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button type="submit">Bookmarks</button>
              </li>
              <li>
                <button
                  type="submit"
                  style={{ backgroundColor: '#73ABFF' }}
                  id={styles.add}
                  onClick={handleShowCreateStory}
                >
                  Add Story
                </button>
              </li>
              <li>
                <RxHamburgerMenu
                  onClick={handleShowlogout}
                  style={{ fontSize: '2rem', cursor: 'pointer' }}
                />
                <div
                  id={styles.hamburgerContainer}
                  style={{
                    position: 'absolute',
                  }}
                  className={showLogout ? styles.animate : ''}
                >
                  <p>{localStorage.getItem('userName')}</p>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
export default NavBar
