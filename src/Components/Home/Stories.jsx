/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import axios from 'axios'
import StoryCategoryCard from './StoryCategoryCard'

const Stories = ({ query }) => {
  const [allStories, setAllStories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `https://swiptory-backend-production.up.railway.app/api/story/stories?category=${query}`
      )
      setAllStories(data?.data?.filteredStories)
    }

    fetchData()
    const intervalId = setInterval(fetchData, 5000)

    return () => clearInterval(intervalId)
  }, [query])

  return (
    <div>
      <StoryCategoryCard stories={allStories} />
    </div>
  )
}
export default Stories
