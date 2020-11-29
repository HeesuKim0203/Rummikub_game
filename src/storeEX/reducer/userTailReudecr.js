import {
    TAIL_IN,
    TAIL_OUT,
    TAIL_ADD,
    TAIL_DELETE,
    RESET_POSITION,
    ASC_TAIL,
    SET_TAIL_SECTION,
    MOVE_TAIL,
    TAIL_SECTION_TAIL_ADD
} from '../type' ;

import tailReducer from './tailReudecr' ;

import tailData from '../../assets/tailData' ;

const userTailReducer = (
    state = { 
        userTail : [ ...tailData.slice(0, 14) ],
        selectTail : [],
        moveTail : [],
        tailSection : [ 
            { 
                x : 0, 
                y : 0, 
                width : 0, 
                data : [ ...tailData.slice(14, 17) ],
                section : false
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
                moveTail : tailReducer(state.moveTail, {
                    type : TAIL_DELETE,
                    tailId : action.tail.id
                })
            }
        case TAIL_OUT :
            return {
                ...state,
                userTail : tailReducer(state.userTail, {
                    type : TAIL_DELETE,
                    tailId : action.tail.id
                }),
                moveTail : tailReducer(state.moveTail, {
                    type : TAIL_ADD,
                    tail : newTail
                })
            }
        case RESET_POSITION :
            const tailSectionPosition = [] ;
            const moveTailInUserTail = [ ...state.moveTail.filter(tail => tail.sectionNum === undefined) ] ;
            for(let i = 0 ; i < state.tailSection.length ; i++) {
                const array =  [ ...state.tailSection[i].data.filter(tail => tail.sectionNum === i), ...state.moveTail.filter(tail => tail.sectionNum === i) ] ;
                tailSectionPosition[i] = {
                    ...state.tailSection[i],
                    width : 135,
                    data : [ ...array.map(tail => ({ ...tail, select : false, section : i })) ]
                }
            }
            return {
                ...state,
                selectTail : [],
                moveTail : [],
                userTail : [ 
                    ...state.userTail, 
                    ...moveTailInUserTail
                ].sort((a, b) => a.num - b.num),
                tailSection : tailSectionPosition
            }
        case ASC_TAIL :
            return state.selectTail.length !== 0 ? state : {
                ...state,
                userTail : [ ...state.userTail.sort((a, b) => a.num - b.num) ]
            }
        case SET_TAIL_SECTION :
            const findSection = state.tailSection[ action.id ] ;
            const newSection = {
                ...findSection,
                data : [...findSection.data.map(tail => ({...tail, section : action.id, sectionNum : action.id,}))],
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
            const moveTailRemove = state.moveTail.findIndex(tail => tail.id === action.tail.id) ;
            const newSectionAdd = {
                ...findSectionAdd,
                width : findSectionAdd.width + 45,
                data : [ 
                    ...findSectionAdd.data, 
                        {
                            ...action.tail, 
                            select : false, 
                            section : action.id, 
                            sectionNum : false 
                        } 
                    ].sort((a, b) => a.num - b.num)
            } ;
            return {
                ...state,
                moveTail : [
                    ...state.moveTail.slice(0, moveTailRemove),
                    ...state.moveTail.slice(moveTailRemove + 1, state.moveTail.length) 
                ],
                tailSection : [
                    ...state.tailSection.slice(0, action.id),
                    newSectionAdd,
                    ...state.tailSection.slice(action.id + 1, state.tailSection.length)
                ]
            }
        case MOVE_TAIL :
            const findSectionData = state.tailSection[action.id] ;
            const removeTailId = findSectionData.data.findIndex(tail => tail.id === action.tail.id) ;
            const findSectionDataRemove = [
                ...findSectionData.data.slice(0, removeTailId),
                ...findSectionData.data.slice(removeTailId + 1, findSectionData.data.length)
            ].sort((a, b) => a.num - b.num) ;
            return {
                ...state,
                moveTail : [
                    ...state.moveTail, {...newTail, x : action.x, y : action.y, section : false}
                ],
                tailSection : [
                    ...state.tailSection.slice(0, action.id),
                    { ...findSectionData, width : findSectionData.width - 45, data : findSectionDataRemove },
                    ...state.tailSection.slice(action.id + 1, state.tailSection.length)
                ]
            }
        default :
            return state ;
    }
}

export default userTailReducer ;