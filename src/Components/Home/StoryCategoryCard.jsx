/* eslint-disable react/prop-types */
import StoryCard from './StoryCard'
import styles from './StoryCategoryCard.module.css'

const StoryCategoryCard = ({ stories }) => {
  return (
    <div>
      {Object.entries(stories)?.map(([key, value], idx) => {
        return (
          <div key={idx} id={styles.container}>
            <h1>Top Stories regarding {key}</h1>
            <div className={styles.categories}>
              {value.length !== 0 ? (
                value.map((item) => {
                  return (
                    <StoryCard
                      key={item?._id}
                      id={item?._id}
                      heading={item?.heading}
                      description={item?.description}
                      image={item?.imageUrl}
                      slides={item?.slides}
                      likes={item?.likedStories.length}
                    />
                  )
                })
              ) : (
                <p
                  style={{
                    margin: '5rem 0',
                    color: '#8E8E8E',
                    fontWeight: 'bold',
                  }}
                >
                  No Stories available
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default StoryCategoryCard
