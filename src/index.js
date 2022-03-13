import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { store } from './redux/store'
import { Provider } from 'react-redux'

import './style/index.css'

ReactDOM.render(
  <React.StrictMode>
    <main className='p-[29px]'>
      <Provider store={store}>
        <App />
      </Provider>
    </main>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
