import {
    TAIL_IN,
    TAIL_OUT,
    TAIL_ADD,
    TAIL_DELETE,
    RESET_POSITION,
    ASC_TAIL 
} from '../type' ;

import tailReducer from './tailReudecr' ;

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
    num : -1,
    x : 0,
    y : 0,
    select : false,
    id : count++
}) ;
tailData.push({
    color : DARK_RED,
    num : -1,
    x : 0,
    y : 0,
    select : false,
    id : count++
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

const userTailReducer = (
    state = { 
        userTail : [ ...tailData.slice(0, 14) ],
        selectTail : [],
    },
    action
) => {
    const newTail = {
        ...action.tail,
        x : action.x,
        y : action.y,
        select : action.select
    } ; 
    switch(action.type) {
        case TAIL_IN :
            return {
                userTail : tailReducer(state.userTail, {
                    type : TAIL_ADD,
                    tail : newTail
                }),
                selectTail : tailReducer(state.selectTail, {
                    type : TAIL_DELETE,
                    tailId : action.tail.id
                }),
            }
        case TAIL_OUT :
            return {
                userTail : tailReducer(state.userTail, {
                    type : TAIL_DELETE,
                    tailId : action.tail.id
                }),
                selectTail : tailReducer(state.selectTail, {
                    type : TAIL_ADD,
                    tail : newTail
                }),
            }
        case RESET_POSITION :
            return {
                selectTail : [],
                userTail : [ 
                    ...state.userTail, 
                    ...state.selectTail.map(tail => ({
                        ...tail,
                        x : 0,
                        y : 0,
                        select : false
                    }))
                ].sort((a, b) => a.num - b.num)
            }
        case ASC_TAIL :
            return state.selectTail.length !== 0 ? state : {
                ...state,
                userTail : [ ...state.userTail.sort((a, b) => a.num - b.num) ]
            }
        default :
            return state ;
    }
}

export default userTailReducer ;