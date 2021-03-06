import { setMessage, dismissError } from './error-message-reducer'

export const INCREMENT_SCORE = 'dogRate/INCREMENT_SCORE'
export const DECREMENT_SCORE = 'dogRate/DECREMENT_SCORE'
export const ADD_DOG = 'dogRate/ADD_DOG'
export const DELETE_DOG = 'dogRate/DELETE_DOG'
export const DOG_REQUEST_MADE = 'dogRate/DOG_REQUEST_MADE'
export const INITIAL_DOG_LOAD = 'dogRate/INITIAL_DOG_LOAD'
export const SET_SCORE = 'dogRate/SET_SCORE'

const initialState = []

export default (state=initialState, action) => {
  switch(action.type) {

    case INITIAL_DOG_LOAD:
      return action.payload

    case SET_SCORE:
      return state.map((dog) => {
        if (dog.id === action.payload.id) {
          dog.currentScore = action.payload.score
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


export const loadDogs = () => {
  return (dispatch) => {
    fetchDoggos().then((dogs) => {
      dogs = dogs.map((d) => {return { ...d, currentScore: d.ratings[0] ? d.ratings[0].score : 12}})
      dispatch({
        type: INITIAL_DOG_LOAD,
        payload: dogs
      })
    })
  }
}

export const decrementScore = (id) => {
  return (dispatch, getState) => {
    const state = getState().dogRate;
    const dog = state.filter((dog)=>dog.id===id)[0]

    if (state.filter((dog)=>dog.id===id)[0].currentScore <= 10){
      dispatch(setMessage("They're good dogs, Br" + getVowel() + "nt"))
    }

    else {
      let body = {
        userId: 1,
        dogId: id,
        score: dog.currentScore - 1
      }

      fetch('http://localhost:3001/ratings', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then((response) => response.json())
          .then((resJson) => {
            dispatch({
              type: SET_SCORE,
              payload: {id: id, score: resJson.score}
            })
          })
        .catch((e) => console.log(e))
    }
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


export const incrementScore = (id) => {
  return (dispatch, getState) => {
    const state = getState().dogRate
    const dog = state.filter((dog)=>dog.id===id)[0]

    if (dog.currentScore === 10) {
      dispatch(dismissError())
    }

    let body = {
      userId: 1,
      dogId: id,
      score: dog.currentScore + 1
    }

    fetch('http://localhost:3001/ratings', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((response) => response.json())
        .then((resJson) => {
          dispatch({
            type: SET_SCORE,
            payload: {id: id, score: resJson.score}
          })
        })
      .catch((e) => console.log(e))
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

    fetchNewDoggo().then((dog) => {
      dispatch({
        type: ADD_DOG,
        payload: {
          id: dog.id,
          temporaryId: uid,
          imageSource: dog.imageSource,
          currentScore: 12
        }
      })
    })
  }
}

export const deleteDog = (id) => {
  return dispatch => {
    fetch('http://localhost:3001/dogs/' + id, {method: 'DELETE'})
      .then(() => {
          dispatch({
            type: DELETE_DOG,
            payload: id
          })
        })
      .catch((e) => console.log(e))
  }
}

const fetchDoggos = () => {
  return fetch('http://localhost:3001/dogs')
    .then((r)=>r.json())
    .then((response) => {
      return response
    })
}

const fetchNewDoggo = () => {
  return fetch('http://localhost:3001/dogs/new')
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
