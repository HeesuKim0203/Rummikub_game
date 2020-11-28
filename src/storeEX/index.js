import { createStore, applyMiddleware } from 'redux' ;
import logger from 'redux-logger' ;
import { combineReducers } from 'redux' ;

import timerTailReuder from './reducer/timerReuder' ;
import userTailReducer from './reducer/userTailReudecr';

const reduer = combineReducers( { tail : userTailReducer, time : timerTailReuder } ) ;

const store = createStore(reduer, applyMiddleware(logger)) ;

export default store ;