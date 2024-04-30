/* eslint-disable react/prop-types */
import styles from './StoryCard.module.css'
import { FaRegEdit } from 'react-icons/fa'
import { useContext, useState } from 'react'
import { RegisterContext } from '../../utils/RegisterContext'
import { StoryContext } from '../../utils/StoryContext'
import axios from 'axios'
import StoryPost from './StoryPost'

const StoryCard = ({ heading, description, image, id, slides, likes }) => {
  const { isLoggedIn } = useContext(RegisterContext)
  const { setshowCreateStory, setpostInfo, setstoryId, setIsEdit } =
    useContext(StoryContext)

  const [showStory, setshowStory] = useState(false)

  const handleEditStoryForm = () => {
    axios
      .get(
        `https://swiptory-backend-production.up.railway.app/api/story/story-id/${id}`
      )
      .then((res) => {
        setstoryId(id)
        setpostInfo({
          heading: res.data.story.heading,
          desc: res.data.story.description,
          image: res.data.story.imageUrl,
          category: res.data.story.category,
        })
        setIsEdit(true)
      })
      .catch((error) => console.log(error))
    setshowCreateStory(true)
  }

  const handleShowStory = () => {
    setshowStory(true)
  }

  return (
    <>
      <div id={styles.cardContainer}>
        <div className={styles.imageContainer} onClick={handleShowStory}>
          <img src={image} alt="story-card" />
        </div>
        <div className={styles.cardInfoDesc}>
          <h1>{heading}</h1>
          <p>{description}</p>
          {isLoggedIn ? (
            <button type="submit" onClick={handleEditStoryForm}>
              <FaRegEdit style={{ fontSize: '1rem' }} />
              Edit
            </button>
          ) : null}
        </div>
      </div>
      {showStory ? (
        <StoryPost
          setshowStory={setshowStory}
          slides={slides}
          storyHeaderId={id}
          likes={likes}
        />
      ) : null}
    </>
  )
}
export default StoryCard
