import { setMessage, dismissError } from './error-message-reducer'

export const INCREMENT_SCORE = 'dogRate/INCREMENT_SCORE'
export const DECREMENT_SCORE = 'dogRate/DECREMENT_SCORE'
export const ADD_DOG = 'dogRate/ADD_DOG'
export const DELETE_DOG = 'dogRate/DELETE_DOG'
export const DOG_REQUEST_MADE = 'dogRate/DOG_REQUEST_MADE'

const initialState = [
  {
    id: 1,
    currentScore: 12,
    loading: false,
    imgSrc: 'http://a57.foxnews.com/images.foxnews.com/content/fox-news/lifestyle/2018/03/08/corgi-got-fat-shamed-and-internet-could-not-handle-it/_jcr_content/par/featured_image/media-0.img.jpg/1470/828/1520540975471.jpg?ve=1&tl=1'
  },
  {
    id: 2,
    currentScore: 12,
    loading: false,
    imgSrc: 'https://vetstreet.brightspotcdn.com/dims4/default/8608a7b/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Ff6%2F95%2Fb91443a6470cab45132fb2e90114%2FAP-NM4WCH-ph645080113.jpg'
  }
]

export default (state=initialState, action) => {
  switch(action.type) {
    case INCREMENT_SCORE:
      return state.map((dog) => {
          if(dog.id === action.payload){ 
            dog.currentScore ++
          }
          return dog
        })
      
    case DECREMENT_SCORE:
      return state.map((dog) => {
        if (dog.id === action.payload) {
          dog.currentScore--
        }
        return dog
      })

    case DOG_REQUEST_MADE:
      return [...state, action.payload]

    case ADD_DOG:
      return state.map((dog) => {
        if (dog.id === action.payload.temporaryId) {
          return action.payload
        } else {
          return dog
        }
      })

    case DELETE_DOG:
      return state.filter((dog) => dog.id !== action.payload)

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

export const decrementScore = (id) => {
  return (dispatch, getState) => {
    const state = getState().dogRate;

    if (state.filter((dog)=>dog.id===id)[0].currentScore <= 10){
      dispatch(setMessage("They're good dogs, Br" + getVowel() + "nt"))
    }
    else{
      dispatch({
        type: DECREMENT_SCORE,
        payload: id
      })
    }
  }
}

export const incrementScore = (id) => {
  return (dispatch, getState) => {
    const state = getState().dogRate

    if (state.filter((dog)=>dog.id===id)[0].currentScore === 10) {
      dispatch(dismissError())
    }

    dispatch({
      type: INCREMENT_SCORE,
      payload: id
    })
  }
}

export const addDog = () => {
  return (dispatch, getState) => {
    const state = getState().dogRate
    const lastDog = state[state.length - 1] 
    const uid = generate_uid()
    const placeholderDog = {
      id: uid, 
      loading: true,
    }

    dispatch({
      type: DOG_REQUEST_MADE,
      payload: placeholderDog
    })

    fetchDoggo().then((dog) => {
      dispatch({
        type: ADD_DOG,
        payload: {
          id: dog.id,
          temporaryId: uid,
          imgSrc: dog.imageSource,
          currentScore: 12
        }
      })
    })
  }
}

export const deleteDog = (id) => {
  return dispatch => {
    dispatch({
      type: DELETE_DOG,
      payload: id
    })
  }
}

const fetchDoggo = () => {
  return fetch('http://localhost:3001/dogs')
    .then((r)=>r.json())
    .then((response) => {
      return response
    })
}

const generate_uid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
