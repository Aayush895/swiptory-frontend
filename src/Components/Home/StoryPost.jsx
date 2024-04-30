/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import styles from './StoryPost.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { CiBookmark, CiHeart } from 'react-icons/ci'
import { FcLike } from 'react-icons/fc'
import axios from 'axios'
import { RegisterContext } from '../../utils/RegisterContext'

const StoryPost = ({ setshowStory, slides, storyHeaderId, likes }) => {
  const { isLoggedIn } = useContext(RegisterContext)
  const [toggleLike, setToggleLike] = useState(false)
  const handleShowStory = () => {
    setshowStory(false)
  }

  const handleLike = () => {
    setToggleLike(true)
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token
    axios
      .put(
        `https://swiptory-backend-production.up.railway.app/api/story/likeStory`,
        {
          id: storyHeaderId,
        }
      )
      .then((res) => {
        if (res.data.message == 'liked') {
          alert(`Post already liked, like counter won't increase`)
        }
      })
  }

  const handleunLike = () => {
    setToggleLike(false)

    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token
    axios
      .put(
        `https://swiptory-backend-production.up.railway.app/api/story/unlikeStory`,
        {
          id: storyHeaderId,
        }
      )
      .then((res) => {
        console.log(res)
      })
  }

  const handleBookmark = () => {}

  return (
    <div id={styles.mainContainer}>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className={styles.mySwiper}
      >
        {slides.map((slide) => {
          return (
            <SwiperSlide key={slide?._id} >
              <div id={styles.swiperContainer}>
                <div id={styles.cardContainer}>
                  <div
                    className={styles.imageContainer}
                    onClick={handleShowStory}
                  >
                    <img src={slide.imageUrl} alt="story-card" />
                  </div>
                  <div className={styles.cardInfoDesc}>
                    <h1>{slide.heading}</h1>
                    <p>{slide.description}</p>
                    {isLoggedIn ? (
                      <div id={styles.bookmark_like}>
                        <CiBookmark
                          className={styles.bookmark}
                          onClick={handleBookmark}
                        />
                        <div>
                          {toggleLike ? (
                            <FcLike
                              className={styles.like}
                              onClick={handleunLike}
                            />
                          ) : (
                            <CiHeart
                              className={styles.unlike}
                              onClick={handleLike}
                            />
                          )}
                          {likes}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <IoIosCloseCircleOutline
        className={styles.close}
        onClick={handleShowStory}
      />
    </div>
  )
}
export default StoryPost
