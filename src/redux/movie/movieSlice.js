import { createSlice } from '@reduxjs/toolkit'
import { movies$ } from '../../data/movies'
import { isKeyExistsInLS } from '../../helpers/localStorage'

const initialState = {
  movies: [],
  loading: false,
  hasErrors: false,
  deletedMovies: [],
  likedMovies: [],
  currentCategory: 'all',
  currentPage: 1,
  moviesPerPage: 4,
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    getMovies: (state) => {
      state.loading = true
    },
    getMoviesSuccess: (state, { payload }) => {
      state.movies = payload
      state.loading = false
      state.hasErrors = false
    },
    getMoviesFailure: (state) => {
      state.loading = false
      state.hasErrors = true
    },
    setMoviesPerPageReducer: (state, action) => {
      state.moviesPerPage = action.payload
      console.log(action.payload)
    },
    setCurrentCategoryReducer: (state, action) => {
      state.currentCategory = action.payload
    },
    setCurrentPageReducer: (state, action) => {
      state.currentPage = action.payload
    },
  },
})

export const {
  getMovies,
  getMoviesSuccess,
  getMoviesFailure,
  setMoviesPerPageReducer,
  setCurrentCategoryReducer,
  setCurrentPageReducer,
} = movieSlice.actions

export const moviesSelector = (state) => state.movies

export default movieSlice.reducer

export function fetchMovies() {
  return (dispatch) => {
    dispatch(getMovies())
    const data = movies$
      .then((result) => dispatch(getMoviesSuccess(result)))
      .catch((error) => dispatch(getMoviesFailure(error)))
  }
}
