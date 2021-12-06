import React from 'react'
import 'tailwindcss/tailwind.css'
import { useAppContext } from '../components/AppContext'
import { useEffect, useState } from 'react'
import { loadData, loadDataSuccess } from '../lib/context/actions'
import ExchangeRateRow from './ExchangeRateRow'

const periods = ['1h', '24h', '7d', '30d']

const AppLoader = () => {
  const [state, dispatch] = useAppContext()
  const [period, setPeriod] = useState('24h')

  const loadCoinsData = async (period) => {
    dispatch(loadData())
    const resp = await fetch(
      `http://localhost:3000/api/coins${period ? '?period=' + period : ''}`
    )
    const currencies = await resp.json()
    dispatch(loadDataSuccess(currencies))
  }

  useEffect(() => {
    if (!state || (state?.data === null && !state.loading)) {
      loadCoinsData()
    }
  }, [state?.data, dispatch])

  useEffect(() => {
    if (state?.data && period) {
      loadCoinsData(period)
    }
  }, [period])

  return (
    <div>
      <span>{state?.loading ? 'Loading...' : ''}</span>
      <div className="flex items-center justify-start h-16 pl-2 top-0 sticky z-50 bg-white">
        <label htmlFor="period">Period: </label>
        <select
          id="period"
          name="period"
          onChange={(e) => setPeriod(e.target.value)}
          defaultValue={period}
        >
          {periods.map((p) => (
            <option key={`k_${p}`} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div id="data-container" className="flex flex-col w-full">
        {state?.data &&
          Object.keys(state.data)
            .sort((a, b) => b.p - a.p)
            .map((c, id) => <ExchangeRateRow key={`row_${id}`} currency={c} />)}
      </div>
    </div>
  )
}

export default AppLoader
