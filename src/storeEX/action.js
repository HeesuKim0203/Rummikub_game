import { 
    TAIL_IN,
    TAIL_OUT,
    RESET_POSITION,
    ASC_TAIL,
    TIME_UPDATE
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

const createAction = {
    tailClick,
    tailClickOut,
    resetPosition,
    ascTail,
    timeUpdate
} ;

export default createAction ;

