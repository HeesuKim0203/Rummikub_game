import { 
    TIME_UPDATE
}  from '../type' ;

import { LNITIAL_TIME } from '../../components/util' ;

const timerReduer = (
    state=LNITIAL_TIME, 
    action
) => 
    action.type === TIME_UPDATE ? 
    (action.time ? action.time : state) 
    : state ;

export default timerReduer ;