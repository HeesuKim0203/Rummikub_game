import { createStore, applyMiddleware } from 'redux' ;
import logger from 'redux-logger' ;
import { combineReducers } from 'redux' ;

import { LNITIAL_TIME } from './components/util' ;

import tailData from './assets/tailData' ;

const SELECT_USERTAIL = 'SELECT_USERTAIL' ;
const SELECT_CANCEL = 'SELECT_CANCEL' ;
const SELECT_ANTHORTAIL = 'SELECT_ANTHORTAIL' ;

const UPDATE_TIME = 'UPDATE_TIME' ;

const selectUserTail = tail => ({
    type : SELECT_USERTAIL,
    tail
}) ;

const selectCancel = tail => ({
    type : SELECT_CANCEL,
    tail
}) ;

const selectAnthorTail = tail => ({
    type : SELECT_ANTHORTAIL,
    tail
}) ;

const updateTime = time => ({
    type : UPDATE_TIME,
    time
}) ;

const idCheck = action => tail => tail.id === action.tail.id ;

const TailReducer = ( 
    state = { 
        userTail : [ 
            ...tailData.slice(0, 14)
            .map(tail => ({ ...tail, type : 'userTail' })) 
        ], 
        selectTail : [], 
        anthorTail : [] 
    }, action ) => {

    const { userTail, selectTail, anthorTail } = state ; 

    const actionIdCheck = idCheck(action) ;

    const userSelectTail = action.tail ? userTail.findIndex(actionIdCheck) : null ;
    const selectSelectTail = action.tail ? selectTail.findIndex(actionIdCheck) : null ;
    const anthorSelectTail = action.tail ? anthorTail.findIndex(actionIdCheck) : null ;

    const tail = userTail[userSelectTail] || selectTail[selectSelectTail] || anthorTail[anthorSelectTail] ;

    switch(action.type) {
        case SELECT_USERTAIL :
            return {
                ...state,
                userTail : [
                    ...userTail.slice(0, userSelectTail),
                    ...userTail.slice(userSelectTail + 1, userTail.length) 
                ],
                selectTail : [
                    ...selectTail,
                    tail,
                ]
            } ;
        case SELECT_CANCEL :
            return tail.type === 'userTail' ? {
                ...state,
                selectTail : [
                    ...selectTail.slice(0, selectSelectTail),
                    ...selectTail.slice(selectSelectTail + 1, selectTail.length)
                ],
                userTail : [
                    ...userTail,
                    tail
                ]
            } : {
                ...state,
                selectTail : [
                    ...selectTail.slice(0, selectSelectTail),
                    ...selectTail.slice(selectSelectTail + 1, selectTail.length)
                ],
                anthorTail : [
                    ...anthorTail,
                    tail
                ]
            } ;
        case SELECT_ANTHORTAIL :
            return {
                ...state,
                anthorTail : [
                    ...anthorTail.slice(0, anthorTail),
                    ...anthorTail.slice(anthorTail + 1, anthorTail.length) 
                ],
                selectTail : [
                    ...selectTail,
                    tail,
                ]
            } ;
        default :
            return state ;
    }
}

const TimeReducer = ( state = LNITIAL_TIME, action ) => {
    const { time } = action ;
    switch(action.type) {
        case UPDATE_TIME :
            return time ;
        default :
            return state ;
    }
}


const reducer = combineReducers({ tail : TailReducer, time : TimeReducer})
const store = createStore(reducer, applyMiddleware(logger)) ;

export const createAction = {
    selectUserTail,
    selectCancel,
    selectAnthorTail,
    updateTime
} ;

export default store ;
