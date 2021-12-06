import { getRelativeChangeRatio, filterRaw } from '../../lib/coins.lib'
import { getCoinsData } from '../../lib/api/external'

const changeHandler = async (
  { query: { currency = 'USD', period, from, end, comparisonCurrency } },
  res
) => {
  const coins = await getCoinsData(currency, period, from, end)
  const data = filterRaw(coins)

  if (data[comparisonCurrency]) {
    const changes = Object.keys(data).map((name) => {
      if (name === comparisonCurrency) return null
      return {
        pair: `${comparisonCurrency}/${name}`,
        chRatio: `${getRelativeChangeRatio(
          data[comparisonCurrency],
          data[name]
        )}`,
      }
    })

    res.status(200).json(changes)
  } else res.status(404).json({})
}

export default changeHandler
