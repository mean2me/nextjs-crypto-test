import { API_ENDPOINT_HOST } from '../constants'

/**
 * @param {string} currency
 * @param {string} period - 1h, 24h, 7d, 30d
 * @param {number} start
 * @param {number} end
 */
export const getCoinsData = async (
  currency,
  period,
  start = null,
  end = null
) => {
  const updatesFrom = Math.round(new Date().getTime() / 1000) - 60 * 60
  let custom = ''
  if (period === 'custom') {
    custom = `&start=${start}&end=${end}`
  }
  const url = `${API_ENDPOINT_HOST}/api/coins?currency=${
    currency ? currency : 'USD'
  }&updates_from=${updatesFrom}&period=${
    period ? period : '24h'
  }${custom}&no_charts=true`
  const resp = await fetch(url)

  return resp.json()
}
