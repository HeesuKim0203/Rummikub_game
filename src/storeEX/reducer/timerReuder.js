import { 
    TIME_UPDATE
}  from '../type' ;

import { LNITIAL_TIME } from '../../components/util' ;


const timerReduer = (state=LNITIAL_TIME, action) => action.time ? action.time : state ;

export default timerReduer ;