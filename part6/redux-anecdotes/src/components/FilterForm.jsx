import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const FilterForm = () => {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    const inputValue = e.target.value
    dispatch(setFilter(inputValue))
  }
  return (
    <div>
      <label htmlFor="filter">filter:</label>
      <input type="text" name="filter" onChange={handleChange} />
    </div>
  )
}

export default FilterForm
