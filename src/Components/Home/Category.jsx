/* eslint-disable react/prop-types */
import styles from './Category.module.css'
import { categories } from '../../utils/constants'

const Category = ({ setQuery }) => {
  const handleQuery = (e) => {
    setQuery(e.target.innerText || e.target.alt)
  }

  return (
    <div id={styles.container}>
      <div className={styles.category} onClick={handleQuery}>
        <h1>All</h1>
        <img
          src="https://images.pexels.com/photos/242492/pexels-photo-242492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="All"
        />
      </div>

      {categories.map((item) => (
        <div className={styles.category} key={item?.id} onClick={handleQuery}>
          <h1>{item?.category}</h1>
          <img src={item?.imgUrl} alt={item?.category} />
        </div>
      ))}
    </div>
  )
}
export default Category
