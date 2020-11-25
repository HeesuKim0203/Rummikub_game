import React, { useEffect, useState } from 'react' ;
import styled from 'styled-components' ;
import { connect } from 'react-redux' ;

import Tail from './Tail' ;
import SelectTail from './SelectTail' ;
import Timer from './Timer' ;

// tile이 만나는 zone
const Container = styled.div`
    width : 75% ;
    height : 100% ;

    border : 1px solid #111 ;
`;

const GameZone = styled.div`
    width : 100% ;
    height : 77% ;

    border-bottom : 1px solid #111 ;

    display : flex ;
    flex-wrap : wrap ;
`;

// tile 두는 zone
const TailZone = styled.div`
    width : 100% ;
    height : 20% ;
`;

const TailZoneStairs = styled.div`
    width : 100% ;
    height : 50% ;
    
    display : flex ;
    flex-direction : row ;

    &:not(:last-child) {
        border-bottom : 1px solid #111 ;
    }
`;

const RoomCenterSection = ({ tailData, selectTail }) => {
    const [ tailSection, setTailSection ] = useState([]) ;

    return (
        <Container>
            <Timer/>
            <SelectTail />
            <GameZone>
                {tailSection && tailSection.map(() => {
                    
                })}
            </GameZone>
            <TailZone>
                <TailZoneStairs>
                    {tailData && tailData.map((tail, index) =>
                        <Tail 
                            key={index} 
                            id={index} 
                            color={tail.color}
                            num={tail.num}
                            x={tail.x}
                            y={tail.y}
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
    const { tailData, selectTail } = state ;

    // tailData 개수가 첫번째 Tail 존을 초과했을때 알고리즘

    return {
        tailData,
        selectTail
    } ;
}

export default connect(mapStateToProps)(RoomCenterSection) ;