/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import axios from 'axios'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import styles from './CreateStory.module.css'
import { StoryContext } from '../../utils/StoryContext'

const CreateStory = () => {
  const {
    setshowCreateStory,
    postInfo,
    setpostInfo,
    storyId,
    isEdit,
    postHeader,
    setpostHeader,
  } = useContext(StoryContext)

  const [slides, setSlides] = useState(['Slide', 'Slide', 'Slide'])
  const [isFirstSlide, setisFirstSlide] = useState(true)
  const [slideData, setslideData] = useState([])


  const handlePostStory = (e) => {
    e.preventDefault()
    if (
      !postInfo?.heading ||
      !postInfo?.desc ||
      !postInfo?.image ||
      !postInfo?.category ||
      slideData.length < 2
    ) {
      alert('Please fill all the details properly')
      return
    }

    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token
    axios
      .post(
        'https://swiptory-backend-production.up.railway.app/api/story/createstory',
        {
          heading: postHeader.heading,
          desc: postHeader.description,
          image: postHeader.imageUrl,
          category: postHeader.category,
          slides: slideData,
        }
      )
      .then(() => setshowCreateStory(false))
      .catch((error) => console.log(error))
  }

  const handleEditStory = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token
    if (
      !postInfo?.heading ||
      !postInfo?.desc ||
      !postInfo?.image ||
      !postInfo?.category
    ) {
      return
    }
    axios
      .put(`http://localhost:3000/api/story/updatestory/${storyId}`, {
        heading: postInfo.heading,
        desc: postInfo.desc,
        image: postInfo.image,
        category: postInfo.category,
      })
      .then(() => setshowCreateStory(false))
      .catch((error) => console.log(error))
  }

  const handleSlideBtns = () => {
    setSlides([...slides, 'Slide'])
  }

  const handleSlideData = (idx) => {
    if (
      postInfo?.heading &&
      postInfo?.desc &&
      postInfo?.image &&
      postInfo?.category
    ) {
      if (idx !== 0) {
        setisFirstSlide(false)
      }

      setslideData([
        ...slideData,
        {
          heading: postInfo?.heading,
          description: postInfo?.desc,
          imageUrl: postInfo?.image,
          category: postInfo?.category,
        },
      ])

      setpostInfo({ ...postInfo, heading: '', desc: '', image: '' })
    } else {
      alert('Please fill the form data')
    }
  }

  
  const handleHeading = (e) => {
    setpostInfo({ ...postInfo, heading: e.target.value })
    if (isFirstSlide) {
      setpostHeader({
        ...postHeader,
        heading: e.target.value,
      })
    }
  }

  const handleDescription = (e) => {
    setpostInfo({ ...postInfo, desc: e.target.value })
    if (isFirstSlide) {
      setpostHeader({
        ...postHeader,
        description: e.target.value,
      })
    }
  }

  const handleImage = (e) => {
    setpostInfo({ ...postInfo, image: e.target.value })
    if (isFirstSlide) {
      setpostHeader({
        ...postHeader,
        imageUrl: e.target.value,
      })
    }
  }

  const handleCategoryOption = (e) => {
    setpostInfo({ ...postInfo, category: e.target.value })
    if (isFirstSlide) {
      setpostHeader({
        ...postHeader,
        category: e.target.value,
      })
    }
  }

  const handleShowCreateStory = () => {
    setshowCreateStory(false)
  }

  return (
    <>
      <div id={styles.mainContainer}>
        <div id={styles.storyContainer}>
          <IoIosCloseCircleOutline
            className={styles.close}
            onClick={handleShowCreateStory}
          />

          <div id={styles.slideBtns}>
            {slides.map((slide, idx) => {
              return (
                <button key={idx} onClick={(idx) => handleSlideData(idx)}>
                  {slide} {idx + 1}
                </button>
              )
            })}
            {slides.length !== 6 ? (
              <button onClick={handleSlideBtns}>Add +</button>
            ) : null}
          </div>

          <form action="" method="post">
            <div>
              <label htmlFor="heading">Heading:</label>
              <input
                type="text"
                name="heading"
                placeholder="Your heading"
                value={postInfo.heading}
                onChange={handleHeading}
              />
            </div>

            <div>
              <label htmlFor="desc">Description:</label>
              <textarea
                name="desc"
                value={postInfo.desc}
                cols="30"
                rows="8"
                placeholder="Story Description"
                onChange={handleDescription}
              />
            </div>

            <div>
              <label htmlFor="image">Image:</label>
              <input
                type="text"
                name="image"
                placeholder="Add Image url"
                value={postInfo.image}
                onChange={handleImage}
              />
            </div>

            <div className={styles.categoryOption}>
              <label htmlFor="category">Category:</label>
              <select
                name="category"
                value={postInfo.category}
                onChange={handleCategoryOption}
              >
                <option value="Select Category">Select Category</option>
                <option value="food">Food</option>
                <option value="health and fitness">Health and Fitness</option>
                <option value="travel">Travel</option>
                <option value="movies">Movies</option>
                <option value="education">Education</option>
              </select>
            </div>

            {!postInfo?.heading ||
            !postInfo?.desc ||
            !postInfo?.image ||
            !postInfo?.category ? (
              <p
                style={{
                  color: 'red',
                  textAlign: 'center',
                }}
                className={styles.error}
              >
                Please fill all the fields in the form
              </p>
            ) : null}

            {isEdit ? (
              <button type="submit" onClick={handleEditStory}>
                Edit
              </button>
            ) : (
              <>
                <button type="submit" onClick={handlePostStory}>
                  Post
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
export default CreateStory
