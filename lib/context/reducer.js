import { LOAD_DATA, LOAD_DATA_SUCCESS, UPDATE_VISIBLE } from './actions'
import { isEqual } from 'lodash'

export const initialState = {
  loading: false,
  data: null,
  visibilityMap: {},
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return { ...state, ...{ loading: true } }
      break
    case LOAD_DATA_SUCCESS:
      return { ...state, ...{ loading: false, data: action.payload } }
      break
    case UPDATE_VISIBLE:
      if (!isEqual(state.visibilityMap, action.payload)) {
        return {
          ...state,
          ...{
            visibilityMap: {
              ...state.visibilityMap,
              ...action.payload,
            },
          },
        }
      }
      break
  }
}
