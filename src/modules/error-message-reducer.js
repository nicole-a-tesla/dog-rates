export const SET_MESSAGE = 'errorMessage/SET_MESSAGE'
export const DISMISS_ERROR = 'errorMessage/DISMISS_MESSAGE'


const initialState = {
  showError: false,
  message: null
}


export default (state=initialState, action) => {
  switch(action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
        showError: true
      }
    case DISMISS_ERROR:
      return {
        ...state,
        message: null,
        showError: false
      }
    default:
      return state
  }
}

export const dismissError = () => {
  return dispatch => {
    dispatch({
      type: DISMISS_ERROR
    })
  }
}

export const setMessage = (message) => {
  return (dispatch) => {
    dispatch({
      type: SET_MESSAGE,
      payload: message
    })
  }
}
