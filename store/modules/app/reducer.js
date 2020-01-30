import { handleActions } from 'redux-actions'
import { SET_LOADING } from './constants'

// exporting type of state for type safe
export type AppState = {
  loading: boolean
}

const initialState: AppState = {
  loading: false
}

// handle actions
export default handleActions(
  {
    [SET_LOADING]: (state: AppState = initialState, action): AppState => {
      return {
        loading: action.payload
      }
    }
  },
  initialState
)
