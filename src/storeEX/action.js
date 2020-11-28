import { 
    TAIL_IN,
    TAIL_OUT,
    RESET_POSITION,
    ASC_TAIL,
    TIME_UPDATE,
    SET_TAIL_SECTION,
    TAIL_SECTION_TAIL_ADD
}  from './type' ;

// tail 데이터 action
const tailClick = (tail, x, y) => ({
    type : TAIL_IN,
    tail,
    x,
    y,
    select : false
}) ;

const tailClickOut = (tail, x, y) => ({
    type : TAIL_OUT,
    tail,
    x,
    y,
    select : true
}) ;

const resetPosition = () => ({
    type : RESET_POSITION
}) ;

const ascTail = () => ({
    type : ASC_TAIL
}) ;

const timeUpdate = time => ({
    type : TIME_UPDATE,
    time
}) ;

const setTailSection = (id, x, y, width) => {
    return {
        type : SET_TAIL_SECTION,
        id,
        x,
        y,
        width
    }
}

const tailSectionTailAdd = (id, tail) => {
    return {
        type : TAIL_SECTION_TAIL_ADD,
        id,
        tail
    }
}
const createAction = {
    tailClick,
    tailClickOut,
    resetPosition,
    ascTail,
    timeUpdate,
    setTailSection,
    tailSectionTailAdd
} ;

export default createAction ;

