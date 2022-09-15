import { filter } from '../reducers/filterReducer'
import { useDispatch, useSelector } from 'react-redux'

const FilterForm = () => {
  const dispatch = useDispatch()
  const filterValue = useSelector(state => state.filter)

  const handleChange  = (event) => {
    event.preventDefault()
    dispatch(filter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }
  return (
        <div style={style}>
          filter: <input value={filterValue} onChange={handleChange } />
        </div>
)}
export default FilterForm