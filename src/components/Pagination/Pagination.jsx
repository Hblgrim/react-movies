import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  moviesSelector,
  setCurrentPageReducer,
} from '../../redux/movie/movieSlice'

const Pagination = ({ totalPages }) => {
  const [disabledPrevious, setDisabledPrevious] = useState(false)
  const [disabledNext, setDisabledNext] = useState(false)
  const { currentPage, currentCategory } = useSelector(moviesSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentPageReducer(1))
  }, [currentCategory, setCurrentPageReducer])

  useEffect(() => {
    setDisabledPrevious(currentPage === 1 ? true : false)
    setDisabledNext(currentPage === totalPages || totalPages === 0)
  }, [currentPage, totalPages])

  function previousPageHandler() {
    dispatch(setCurrentPageReducer(currentPage - 1))
  }

  function nextPageHandler() {
    dispatch(setCurrentPageReducer(currentPage + 1))
  }

  return (
    <div className='flex items-center'>
      <button
        className=' hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-blue-600 bg-blue-600 text-white rounded-md px-3 py-2 disabled:bg-slate-400'
        disabled={disabledPrevious}
        onClick={() => previousPageHandler()}
      >
        <Icon width='20px' height='20px' icon='ic:round-navigate-before' />
      </button>
      <p className='font-bold mx-3'>
        {currentPage} / {totalPages}
      </p>
      <button
        className=' hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-blue-600 bg-blue-600 text-white rounded-md px-3 py-2 disabled:bg-slate-400'
        disabled={disabledNext}
        onClick={() => nextPageHandler()}
      >
        <Icon width='20px' height='20px' icon='ic:round-navigate-next' />
      </button>
    </div>
  )
}

export default Pagination
