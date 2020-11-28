import { 
    TAIL_ADD,
    TAIL_DELETE 
} from '../type' ;

const tailReducer = (
    state,
    action 
) => {
    switch(action.type) {
        case TAIL_ADD :
            return [
                ...state, action.tail
            ] ;
        case TAIL_DELETE :
            const findId = state.findIndex(tail => tail.id === action.tailId) ;
            return [
                ...state.slice(0, findId),
                ...state.slice(findId + 1, state.length)
            ] ;
        default :
            return ;
    }
} ;

export default tailReducer ;