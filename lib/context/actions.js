export const LOAD_DATA = 'LOAD_DATA'
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS'
export const UPDATE_VISIBLE = 'UPDATE_VISIBLE'

export const updateVisible = (visibilityMap) => ({
  type: UPDATE_VISIBLE,
  payload: visibilityMap,
})
export const loadData = () => ({ type: LOAD_DATA })
export const loadDataSuccess = (data) => ({
  type: LOAD_DATA_SUCCESS,
  payload: data,
})
