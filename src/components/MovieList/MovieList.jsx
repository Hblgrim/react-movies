import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  moviesSelector,
  setCurrentCategoryReducer,
  setCurrentPageReducer,
} from '../../redux/movie/movieSlice'
import { Loading } from '../Loading/Loading'
import { MovieCard } from '../MovieCard'

function MovieList({
  isLoading,
  moviesList,
  setMoviesList,
  setTotalPages,
  categoriesList,
  setCategoriesList,
}) {
  const [moviesListForCategory, setMoviesListForCategory] = useState(moviesList)
  const [moviesToPrint, setMoviesToPrint] = useState(moviesListForCategory)
  const dispatch = useDispatch()
  const { currentCategory, moviesPerPage, currentPage } =
    useSelector(moviesSelector)

  useEffect(() => {
    if (currentCategory === 'all') {
      setMoviesListForCategory(moviesList)
    } else {
      setMoviesListForCategory(
        moviesList.filter((movie) => movie.category === currentCategory)
      )
    }
  }, [currentCategory, moviesList])

  useEffect(() => {
    setTotalPages(Math.ceil(moviesListForCategory.length / moviesPerPage))
  }, [moviesListForCategory, moviesPerPage, setTotalPages])

  useEffect(() => {
    setMoviesToPrint(
      moviesListForCategory.slice(
        (currentPage - 1) * moviesPerPage,
        currentPage * moviesPerPage
      )
    )
  }, [moviesListForCategory, currentPage, moviesPerPage])

  // user reaction handler (Like and dislikes)
  function setUserEvaluation(id, userEvaluation) {
    setMoviesList(
      moviesList.map((movie) =>
        movie.id === id
          ? movie.evaluation === userEvaluation
            ? { ...movie, evaluation: '' }
            : { ...movie, evaluation: userEvaluation }
          : movie
      )
    )
  }

  // delete movie handler

  function deleteMovie(id, category) {
    setMoviesList(moviesList.filter((movie) => movie.id !== id))
    if (moviesToPrint.length === 1 && currentPage > 1) {
      dispatch(setCurrentPageReducer(currentPage - 1))
    }
    if (
      moviesList.filter((movie) => movie.category === category).length === 1
    ) {
      setCategoriesList(
        categoriesList.filter((categories) => categories !== category)
      )
      dispatch(setCurrentCategoryReducer('all'))
    }
  }
  if (moviesToPrint.length === 0) {
    return (
      <div className='text-center w-full font-bold text-2xl'>
        There are no further films to be shown. Please reload 🔄 the page{' '}
      </div>
    )
  } else {
    return (
      <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {isLoading ? (
          <Loading />
        ) : (
          moviesToPrint.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              category={movie.category}
              likes={movie.likes}
              dislikes={movie.dislikes}
              evaluation={movie.evaluation}
              deleteMovie={deleteMovie}
              setUserEvaluation={setUserEvaluation}
            />
          ))
        )}
      </div>
    )
  }
}

export default MovieList
