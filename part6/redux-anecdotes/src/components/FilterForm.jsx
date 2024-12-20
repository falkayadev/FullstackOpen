import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const FilterForm = () => {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    dispatch(setFilter(e.target.value))
  }
  return (
    <div>
      <label htmlFor="filter">filter:</label>
      <input type="text" name="filter" onChange={handleChange} />
    </div>
  )
}

export default FilterForm
