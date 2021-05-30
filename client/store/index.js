import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import axios from 'axios';


const LOAD_MESSAGES = 'LOAD_MESSAGES';
const messages = (state = [], action)=> {
  if(action.type === LOAD_MESSAGES){
    return action.messages;
  }
  return state;
}

export const loadMessages = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/messages', {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    dispatch({ type: LOAD_MESSAGES, messages: response.data });
  }
};

const reducer = combineReducers({ auth, messages })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
