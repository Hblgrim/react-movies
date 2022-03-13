import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  setCurrentCategoryReducer,
  setMoviesPerPageReducer,
} from '../../redux/movie/movieSlice'

const Select = ({ label, content, defaultValue }) => {
  const [selectValue, setSelectValue] = useState(defaultValue)

  const dispatch = useDispatch()
  //
  function handleChange(e) {
    setSelectValue(e.target.value)
    // change current category State
    label === 'Catégories' &&
      dispatch(setCurrentCategoryReducer(e.target.value))
    // change Movies Per page State
    label === 'Films par page' &&
      dispatch(setMoviesPerPageReducer(e.target.value))
  }

  return (
    <div>
      <label className='font-bold' htmlFor={label}>
        {label}:
      </label>
      <select
        className='border-1  border-black ml-4'
        name={label}
        value={selectValue}
        onChange={handleChange}
      >
        <option value={defaultValue}>{defaultValue}</option>
        {content.map(
          (item, i) =>
            item !== defaultValue && (
              <option key={i} value={item}>
                {item}
              </option>
            )
        )}
      </select>
    </div>
  )
}
export default Select
