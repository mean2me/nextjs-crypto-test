import React, { useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css'
import { ContextProvider } from '../components/AppContext'
import { appReducer, initialState } from '../lib/context/reducer'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  const [observer, setObserver] = useState(null)

  useEffect(() => {
    setObserver(
      new IntersectionObserver((entries) => {}, {
        root: null,
        treshold: 0.5,
        rootMargin: '0px',
      })
    )
  }, [])

  return (
    <ContextProvider value={initialState} reducer={appReducer}>
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
