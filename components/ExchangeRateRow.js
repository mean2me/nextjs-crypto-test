import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getAllRelativeChangeRatios } from '../lib/coins.lib'
import { useAppContext } from './AppContext'

const ExchangeRateRow = ({ currency }) => {
  const rowRef = useRef(null)
  const [state, dispatch, observer] = useAppContext()
  const [visibility, setVisibility] = useState(false)
  const [changes, setChanges] = useState([])

  useEffect(() => {
    if (rowRef.current) {
      if (observer) {
        observer.observe(rowRef.current)
      }

      return () => {
        if (observer && rowRef.current) {
          observer.unobserve(rowRef.current)
        }
      }
    }
  }, [rowRef, observer])

  useEffect(() => {
    if (state) {
      if (state?.visibilityMap[currency] !== visibility) {
        setVisibility(state?.visibilityMap[currency])
      }
    }
  }, [state, dispatch, observer])

  const changeRates = useMemo(() => {
    return changes.map((changeData, idx) => {
      const color = () => {
        if (changeData.chRatio < 0) {
          return 'bg-red-300 text-red-800'
        } else if (changeData.chRatio > 0) {
          return 'bg-green-300 text-green-800'
        } else {
          return 'bg-white text-black'
        }
      }

      return changeData ? (
        <div
          key={`ch-${idx}`}
          className={`text-sm font-bold flex m-0 h-full justify-center items-center whitespace-nowrap w-24 ${color()}`}
        >
          {changeData.target} {changeData.chRatio}
        </div>
      ) : (
        <div key={`ch-${idx}`}></div>
      )
    })
  }, [changes])

  useEffect(() => {
    if (visibility) {
      const changes = getAllRelativeChangeRatios(state?.data, currency)
      setChanges(changes)
    } else {
      setChanges([])
    }
  }, [visibility, state])

  return (
    <div className="relative flex flex-row h-12 border-b-2 border-gray-500 w-full items-center justify-start pl-6">
      <div
        data-id={currency}
        ref={rowRef}
        className="font-bold sticky left-0 m-0 drop-shadow-lg flex justify-center items-center bg-white h-full w-20 shadow-2xl"
      >
        {currency}
      </div>
      {visibility && changeRates}
    </div>
  )
}

export default ExchangeRateRow
