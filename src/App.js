import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MovieList } from './components/MovieList'
import { Pagination } from './components/Pagination'
import { Select } from './components/Select'
import { movies$ } from './data/movies'
import { moviesSelector } from './redux/movie/movieSlice'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [moviesList, setMoviesList] = useState([])
  const [categoriesList, setCategoriesList] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const { moviesPerPage } = useSelector(moviesSelector)

  // fetch movies

  useEffect(() => {
    movies$
      .then((movies) => {
        setMoviesList(movies)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }, [])

  // get list of categories
  useEffect(() => {
    setCategoriesList([...new Set(moviesList.map((movie) => movie.category))])
  }, [moviesList])

  return (
    <>
      <header className=' shadow-md absolute top-0 left-0 w-full px-5 py-5 z-10 bg-slate-50'>
        <div className='flex justify-between items-center max-w-6xl m-auto'>
          <div className='flex items-center'>
            <img src='./popcorn.png' className='h-9 w-9' />
            <h1 className='font-bold text-lg'>Cinema4U</h1>
          </div>
          <Select
            label='Catégories'
            content={categoriesList}
            defaultValue='all'
          />
        </div>
      </header>
      <div className='bg-white max-w-6xl m-auto mt-16 '>
        <MovieList
          isLoading={isLoading}
          moviesList={moviesList}
          setMoviesList={setMoviesList}
          setTotalPages={setTotalPages}
          categoriesList={categoriesList}
          setCategoriesList={setCategoriesList}
          moviesPerPage={moviesPerPage}
        />
        <div className=' absolute bottom-0 left-0 w-full px-5 py-5 z-10 bg-slate-50'>
          <div className='flex justify-between items-center max-w-6xl m-auto'>
            <div className=' flex items-center justify-between  w-full'>
              <Select
                label='Films par page'
                content={[4, 8, 12]}
                defaultValue={parseInt(moviesPerPage)}
              />
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
