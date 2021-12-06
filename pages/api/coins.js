import { filterRaw } from '../../lib/coins.lib'
import { getCoinsData } from '../../lib/api/external'

const coinsHandler = async (
  { query: { currency, period, start, end } },
  res
) => {
  const coins = await getCoinsData(currency, period, start, end)
  const filtered = filterRaw(coins)

  res.status(200).json(filtered)
}

export default coinsHandler
