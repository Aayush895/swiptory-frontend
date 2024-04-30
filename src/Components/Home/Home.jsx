import { useState } from "react"
import Category from "./Category"
import Stories from "./Stories"


const Home = () => {
  const [query, setQuery] = useState('all')
  return (
    <div>
      <Category setQuery = {setQuery}/>
      <Stories query={query}/>
    </div>
  )
}
export default Home