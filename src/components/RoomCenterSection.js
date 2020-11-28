import React, { useEffect, useRef, useState } from 'react' ;
import styled from 'styled-components' ;

import Tail from './Tail' ;
import SelectTail from './SelectTail' ;
import Timer from './Timer' ;
import AuthorTailSection from './AuthorTailSection' ;
import { connect } from 'react-redux';

// tile이 만나는 zone
const Container = styled.div`
    width : 75% ;
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
    height : 75% ;

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

const RoomCenterSection = ({ userTail, selectTail, tailSection }) => {
    const ContainerElement = useRef() ;

    const [ContainerX, setContainerX ] = useState(0) ;
    const [ContainerY, setContainerY ] = useState(0) ;

    useEffect(() => {
        const { x, y } =  ContainerElement.current.getBoundingClientRect() ;

        setContainerX(x) ;
        setContainerY(y) ;

    }, []) ;

    return (
        <Container ref={ContainerElement}>
            <TimerZone>
                <Timer/>
            </TimerZone>
            <SelectTail />
            <GameZone>
                {tailSection && tailSection.map((tails, index) => (
                    <AuthorTailSection 
                        key={index}
                        id={index}
                        tails={tails} 
                    />
                ))}
            </GameZone>
            <TailZone>
                <TailZoneStairs>
                    {userTail && userTail.map((tail, index) =>
                        <Tail 
                            key={index}
                            tail={tail}
                            ContainerX={ContainerX}
                            ContainerY={ContainerY}
                        />
                    )}
                    {selectTail && selectTail.map((tail, index) =>
                        <Tail 
                            key={index}
                            tail={tail}
                            ContainerX={ContainerX}
                            ContainerY={ContainerY}
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
       tail : { userTail, tailSection, selectTail } 
    } = state ;

    return {
        userTail,
        selectTail,
        tailSection : tailSection.map(tails => tails.data)
    } ;
}

export default connect(mapStateToProps)(RoomCenterSection) ;