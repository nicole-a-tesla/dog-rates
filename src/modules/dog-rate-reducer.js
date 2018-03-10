import { setMessage, dismissError } from './error-message-reducer'

export const INCREMENT_SCORE = 'dogRate/INCREMENT_SCORE'
export const DECREMENT_SCORE = 'dogRate/DECREMENT_SCORE'

const initialState = {
  currentScore: 12,
  imgSrc: 'http://a57.foxnews.com/images.foxnews.com/content/fox-news/lifestyle/2018/03/08/corgi-got-fat-shamed-and-internet-could-not-handle-it/_jcr_content/par/featured_image/media-0.img.jpg/1470/828/1520540975471.jpg?ve=1&tl=1'
}

export default (state=initialState, action) => {
  switch(action.type) {
    case INCREMENT_SCORE:
      return {
        ...state,
        currentScore: state.currentScore + 1
      }
    case DECREMENT_SCORE:
      return {
        ...state,
        currentScore: state.currentScore - 1
      }
    default:
      return state
  }
}

const getVowel = () => {
  let vowelCount = Math.floor(Math.random()*4) + 1
  let vowels = ''
  
  for (let i = 1; i < vowelCount; i++) {
    vowels += ['a','e','i','o','u','y'][Math.floor(Math.random()*6)]
  }

  return vowels
}

export const decrementScore = () => {
  return (dispatch, getState) => {
    const state = getState();

    if (state.dogRate.currentScore <= 10){
      dispatch(setMessage("They're good dogs, Br" + getVowel() + "nt"))
    }
    else{
      dispatch({
        type: DECREMENT_SCORE
      })
    }
  }
}

export const incrementScore = () => {
  return (dispatch, getState) => {
    const state = getState()

    if (state.dogRate.currentScore === 10) {
      dispatch(dismissError())
    }

    dispatch({
      type: INCREMENT_SCORE
    })
  }
}
