import {
    TAIL_IN,
    TAIL_OUT,
    TAIL_ADD,
    TAIL_DELETE,
    RESET_POSITION,
    ASC_TAIL,
    SET_TAIL_SECTION,
    TAIL_SECTION_TAIL_ADD
} from '../type' ;

import tailReducer from './tailReudecr' ;

import tailData from '../../assets/tailData' ;

// 같은 숫자 다른 색깔 3개
// 같은 색깔 숫자 1씩 증가 3개

// 첫턴은 합이 30 이상이여야 한다.

function checkTail(turn, tailList) {
    let sum = 0 ;
    let sameColorCount = 0 ;
    let oneNumCount = 0 ;
    let sameNumCount = 0 ;
    switch(turn) { 
        case 'first turn' :
            tailList.forEach(tail => {
                sum += tail.num ;
            }) ;
            if (sum < 30) return false ;
        case 'turn' :
            for(let i = 0 ; i < tailList.length - 1 ; i++) {
                if(tailList[i].num === tailList[i + 1].num)
                    sameNumCount++ ;
                if(tailList[i].num + 1 === tailList[i + 1].num)
                    oneNumCount++ ;
            }
            if (sameNumCount !== 3) return false ;
            if (oneNumCount !== 3) return false ;
            for(let i = 0 ; i < tailList.length - 1 ; i++) {
                if(tailList[i].color === tailList[i + 1].color)
                    sameColorCount++ ;
            }
            console.log(`sameNumCount : ${sameNumCount} sameColorCount : ${sameColorCount} oneNumCount : ${oneNumCount}`)
            if(sameNumCount === 3 && sameColorCount === 0) return true ;
            if(oneNumCount === 3 && sameColorCount === 3) return true ;
        default : 
            return true ;
    }
}

const userTailReducer = (
    state = { 
        userTail : [ ...tailData.slice(0, 14) ],
        selectTail : [],
        tailSection : [ 
            { 
                x : 0, 
                y : 0, 
                width : 0, 
                data : [ ...tailData.slice(14, 17) ] 
            } 
        ],
        checkValue : false,
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
                ...state,
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
                ...state,
                userTail : tailReducer(state.userTail, {
                    type : TAIL_DELETE,
                    tailId : action.tail.id
                }),
                selectTail : tailReducer(state.selectTail, {
                    type : TAIL_ADD,
                    tail : newTail
                }),
                checkValue : checkTail('turn', [...state.selectTail, newTail])
            }
        case RESET_POSITION :
            return {
                ...state,
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
        case SET_TAIL_SECTION :
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
        case TAIL_SECTION_TAIL_ADD :
            const findSectionAdd = state.tailSection[action.id] ;
            const newSectionAdd = {
                ...findSectionAdd,
                data : [ ...findSectionAdd.data, action.tail ]
            } ;
            return {
                ...state,
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

export default userTailReducer ;