import React  from 'react' ;
import styled from 'styled-components' ;

import Tail from './Tail' ;
import SelectTail from './SelectTail' ;
import Timer from './Timer' ;
import { connect } from 'react-redux';

// tile이 만나는 zone
const Container = styled.div`
    width : 82% ;
    height : 100% ;

    border : 1px solid #111 ;
`;

const TimerZone = styled.div`
    width : 100% ;
    height : 5% ;

    display : flex ;

    margin-bottom : 5px ;
`;

const GameZone = styled.div`
    width : 100% ;
    height : 60% ;

    border-bottom : 1px solid #111 ;

    display : flex ;
    align-content: flex-start ;
    flex-wrap : wrap ;
`;

const SelectTailZone = styled.div`
    width : 100% ;
    height : 13% ;
    
    border-top : 1px solid #111 ;
    border-bottom : 1px solid #111 ;
`;

// tile 두는 zone
const TailZone = styled.div`
    width : 100% ;
    height : 22% ;
`;

const TailZoneStairs = styled.div`
    width : 100% ;
    height : 50% ;
    
    display : flex ;
    align-items : center ;
    flex-direction : row ;

    &:not(:last-child) {
        border-bottom : 1px solid #111 ;
    }
`;

const OneTail = styled.div`
    width : 47px ;
    height : 62px ;
    
    border :  1px solid #111 ;
`;

const RoomCenterSection = ({ userTail }) => {

    const data = [] ;

    for(let i = 0 ; i < 106 ; i++) {
        data[i] = {} ;
    }

    return (
        <Container>
            <TimerZone>
                <Timer/>
            </TimerZone>
            <GameZone>
                { data.map((tail, index) => (
                    <OneTail
                        key={index}
                    >
                        {index} 
                    </OneTail>
                ))}
            </GameZone>
            <SelectTailZone>
                <SelectTail />
            </SelectTailZone>
            <TailZone>
                <TailZoneStairs>
                    {userTail && userTail.map((tail, index) =>
                        <Tail 
                            key={index}
                            tail={tail}
                        />
                    )}
                </TailZoneStairs>
                <TailZoneStairs>
                    
                </TailZoneStairs>
            </TailZone>   
        </Container>
    ) ;
} ;

function mapStateToProps(state) {
   const { 
       tail : { userTail } 
    } = state ;

    return {
        userTail,
        // selectTail
        // tailSection : tailSection.map(tails => tails.data)
    } ;
}

export default connect(mapStateToProps)(RoomCenterSection) ;