import { throttle } from 'lodash'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { updateVisible } from '../lib/context/actions'

export const AppContext = createContext()
AppContext.displayName = 'AppContext'

export const useAppContext = () => useContext(AppContext)

export const ContextProvider = ({ children, initialState, reducer }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const [observer, setObserver] = useState(null)
  useEffect(() => {
    const throttled = throttle(
      (visibilityMap) => dispatch(updateVisible(visibilityMap)),
      200
    )
    const observer = new IntersectionObserver(
      (entries) => {
        const visibilityMap = {}
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id')
          if (id) {
            visibilityMap[id] = entry.isIntersecting
          }
        })
        throttled(visibilityMap)
      },
      {
        root: null,
        threshold: 0.5,
        rootMargin: '0px',
      }
    )
    setObserver(observer)
  }, [])
  return (
    <AppContext.Provider value={[state, dispatch, observer]} reducer={reducer}>
      {children}
    </AppContext.Provider>
  )
}
