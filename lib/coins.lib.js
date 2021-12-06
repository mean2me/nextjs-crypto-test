export function filterRaw(coins) {
  return coins.data.reduce((prev, curr, _idx, _arr) => {
    if (curr.ch && curr.p) {
      prev[curr.s] = {
        ch: curr.ch,
        p: curr.p,
      }
    }
    return prev
  }, {})
}

/**
 * @typedef {Object} Currency
 * @property {number} ch - current change ratio
 * @property {number} p - USDT price
 */

/**
 *
 *
 * @param {Currency} curr1
 * @param {Currency} curr2
 */
export function getRelativeChangeRatio(curr1, curr2) {
  const prevValue1 =
    parseFloat(curr1.p) - parseFloat(curr1.p * 0.01) * parseFloat(curr1.ch)

  const prevValue2 =
    parseFloat(curr2.p) - parseFloat(curr2.p * 0.01) * parseFloat(curr2.ch)

  const prevChange = prevValue1 / prevValue2
  const currChange = curr1.p / curr2.p

  return (((currChange - prevChange) / prevChange) * 100).toFixed(2)
}

export const getAllRelativeChangeRatios = (data, comparisonCurrency) => {
  const changes = Object.keys(data)
    .sort((a, b) => b.p - a.p)
    .map((name) => {
      if (name === comparisonCurrency) return null
      return {
        pair: `${comparisonCurrency}/${name}`,
        target: name,
        chRatio: `${getRelativeChangeRatio(
          data[comparisonCurrency],
          data[name]
        )}`,
      }
    })
  return changes
}
