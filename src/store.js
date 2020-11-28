import { createStore, applyMiddleware } from 'redux' ;
import logger from 'redux-logger' ;
import { combineReducers } from 'redux' ;

import { LNITIAL_TIME } from './components/util' ;

const CARD_NUM = 13, COLOR_NUM = 4 ;
const DARK_BLUE = '#283593',
        DARK_RED = '#d32f2f',
        DARK_ORANGE = '#f57f17',
        DARK_GRAY = '#263238' ;

const tailData = [] ;
const color = [ DARK_BLUE, DARK_RED, DARK_ORANGE, DARK_GRAY ] ;

let count = 0 ;

for(let i = 0 ; i < COLOR_NUM ; i++) {
    for(let z = 0 ; z < 2 ; z++) {
        for(let j = 0 ; j < CARD_NUM ; j++) {
            tailData.push({ color :  color[i] }) ;
            tailData[count].num = j + 1 ;
            tailData[count].x = 0 ;
            tailData[count].y = 0 ;
            tailData[count].select = false ;
            tailData[count].id = count++ ;
        }
    }
}

tailData.push({
    color : DARK_GRAY,
    num : -1    
}) ;
tailData.push({
    color : DARK_RED,
    num : -1 
}) ;

function checkObj(obj) {
    if(obj === null || typeof obj !== 'object')
        return true ;

    return false ;
}

// 객체 깊은 복사
function deepClone(obj) {

    if(checkObj(obj))
        return obj ;
 
    const result = Array.isArray(obj) ? [] : {} ;

    for(let key of Object.keys(obj)) {
        // eslint-disable-next-line no-unused-vars
        result[key] = checkObj(obj[key]) ? obj[key] : false ;
    }

    return result ;
}

count = 0 ;

// 섞기 
for(let i = 0 ; i < tailData.length * 5 ; i++) {

    const random = Math.floor(Math.random() * 106) ;

    const temp = deepClone(tailData[random]) ;
    tailData[random] = deepClone(tailData[count]) ;
    tailData[count++] = deepClone(temp) ;

    count = (count === 106) ? 0 : count ;
}

const ADD_TAILSECTION = 'ADD_TAILSECTION' ;
const TAILSECTION_SET = 'TAILSECTION_SETX' ;
// const TAILSECTION_DELETE = 
const TAILSECTION_TAIL_ADD = 'TAILSECTION_TAIL_ADD' ;

const ADD_TAIL = 'ADD_TAIL' ;
const DELETE_TAIL = 'DELETE_TAIL' ;

const RESET_POSITION = 'RESET_POSITION' ;
const ASC_TAIL = 'ASC_TAIL' ;

const TIME_UPDATE = 'TIME_UPDATE' ;

const timeUpdate = time => ({
    type : TIME_UPDATE,
    time
}) ;

const addTail = tail => ({
        type : ADD_TAIL,
        tail
})

const deleteTail = id => {
    return {
        type : DELETE_TAIL,
        id
    } ;
}

// tail 배열
const addTailSection = tailArray => {
    return  {
        type : ADD_TAILSECTION,
        tailArray
    }
}

const resetPosition = () => {
    return {
        type : RESET_POSITION
    }
}

const ascTail = () => {
    return {
        type : ASC_TAIL
    }
}


const tailSectionSetX = (id, x, y, width) => {
    return {
        type : TAILSECTION_SET,
        id,
        x,
        y,
        width
    }
}

const tailSectionAdd = (id, tail) => {
    return {
        type : TAILSECTION_TAIL_ADD,
        id,
        tail
    }
}

const reducer = ( state = { tailData :  tailData.slice(0, 14), selectTail : [], tailSection : [ { x : 0, y : 0, width : 0, data : [ ...tailData.slice(14, 17) ] } ], time : LNITIAL_TIME }, action ) => {
    switch(action.type) {
        case ADD_TAILSECTION :
                      
            return ;
        case ADD_TAIL :
            const addSelectTail = state.selectTail
                .concat(action.tail)
                .sort((a, b) => a.num - b.num) ;
            return {
                ...state,
                selectTail : addSelectTail,
            } ;
        case DELETE_TAIL :
            const removeSelectTailId = state.selectTail.findIndex(tail => tail.id === action.id) ;
            const newSelectState = [
                ...state.selectTail.slice(0, removeSelectTailId),
                ...state.selectTail.slice(removeSelectTailId + 1, state.selectTail.length), 
            ] ;
            return {
               ...state,
               selectTail : newSelectState,
            } ;
        case RESET_POSITION :
            
            return {
                ...state,
                
                selectTail : [],
            } ;
        case ASC_TAIL :
            const tailDataState = state.tailData
                .sort((a, b) => a.num - b.num) ;
            return {
                ...state,
                tailData : [ ...tailDataState ]
            } ;
        case TIME_UPDATE :
            const update_time = action.time ;
            return {
                ...state,
                time : update_time
            } ; 
        case TAILSECTION_SET :
            const findSection = state.tailSection[action.id] ;
            const newSection = {
                ...findSection,
                x : action.x,
                y : action.y,
                width : action.width
            } ;
            return {
                ...state,
                tailSection : [
                    ...state.tailSection.slice(0, action.id),
                    newSection,
                    ...state.tailSection.slice(action.id + 1, state.tailSection.length)
                ]
            }
        case TAILSECTION_TAIL_ADD :
            const findSectionAdd = state.tailSection[action.id] ;
            const tailObj = action.tail ;
            const removeSelectTailId2 = state.tailData.findIndex(tail => tail.id === action.tail.id) ;
            const newSectionAdd = {
                ...findSectionAdd,
                data : [ ...findSectionAdd.data, tailObj ]
            } ;
            return {
                ...state,
                tailData : [
                    ...state.tailData.slice(0, removeSelectTailId2),
                    ...state.tailData.slice(removeSelectTailId2 + 1, state.tailData.length), 
                ],
                tailSection : [
                    ...state.tailSection.slice(0, action.id),
                    newSectionAdd,
                    ...state.tailSection.slice(action.id + 1, state.tailSection.length)
                ]
            }
        default :
            return state ;
    }
}

const store = createStore(reducer, applyMiddleware(logger)) ;

export const createAction = {
    addTail,
    deleteTail,
    addTailSection,
    resetPosition,
    ascTail,
    timeUpdate,
    tailSectionSetX,
    tailSectionAdd
} ;

export default store ;