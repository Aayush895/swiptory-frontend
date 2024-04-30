import { useState } from 'react'
import NavBar from './Components/NavBar'
import Register from './Components/Registeration/Register'
import Login from './Components/Registeration/Login'
import { RegisterContext } from './utils/RegisterContext'
import { StoryContext } from './utils/StoryContext'
import Home from './Components/Home/Home'
import CreateStory from './Components/Home/CreateStory'

const App = () => {
  const [showRegister, setshowRegister] = useState(false)
  const [showLogin, setshowLogin] = useState(false)
  const [showCreateStory, setshowCreateStory] = useState(false)
  const [storyId, setstoryId] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [isLoggedIn, setisLoggedIn] = useState(!!localStorage.getItem('token'))
  const [postInfo, setpostInfo] = useState({
    heading: '',
    desc: '',
    image: '',
    category: '',
  })
  const [postHeader, setpostHeader] = useState({
    heading: '',
    description: '',
    imageUrl: '',
    category: '',
  })
  return (
    <>
      <RegisterContext.Provider
        value={{
          showRegister,
          setshowRegister,
          showLogin,
          setshowLogin,
          isLoggedIn,
          setisLoggedIn
        }}
      >
        <StoryContext.Provider
          value={{
            showCreateStory,
            setshowCreateStory,
            postInfo,
            setpostInfo,
            storyId,
            setstoryId,
            isEdit,
            setIsEdit,
            postHeader,
            setpostHeader
          }}
        >
          <NavBar setshowCreateStory={setshowCreateStory} />
          {showRegister ? <Register /> : null}
          {showLogin ? <Login /> : null}
          <Home />
          {showCreateStory ? (
            <CreateStory setshowCreateStory={setshowCreateStory} />
          ) : null}
        </StoryContext.Provider>
      </RegisterContext.Provider>
    </>
  )
}
export default App
