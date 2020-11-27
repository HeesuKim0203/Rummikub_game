import React, { useEffect, useRef, useState } from 'react' ;
import styled from 'styled-components' ;
import { connect } from 'react-redux' ;

import Tail from './Tail' ;
import SelectTail from './SelectTail' ;
import Timer from './Timer' ;
import AuthorTailSection from './AuthorTailSection' ;

// tile이 만나는 zone
const Container = styled.div`
    width : 75% ;
    height : 100% ;

    border : 1px solid #111 ;
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

const RoomCenterSection = ({ tailData, tailSection }) => {
    // const [ tailSection, setTailSection ] = useState([]) ;
    const ContainerElement = useRef() ;

    console.log(tailSection) ;

    const [ContainerX, setContainerX ] = useState(0) ;
    const [ContainerY, setContainerY ] = useState(0) ;

    useEffect(() => {
        const { x, y } =  ContainerElement.current.getBoundingClientRect() ;

        setContainerX(x) ;
        setContainerY(y) ;

    }, []) ;

    // console.log(tailData) ;

    return (
        <Container ref={ContainerElement}>
            <Timer/>
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
                    {tailData && tailData.map((tail, index) =>
                        <Tail 
                            key={index} 
                            id={index} 
                            color={tail.color}
                            num={tail.num}
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
    const { tailData, tailSection } = state ;

    // tailData 개수가 첫번째 Tail 존을 초과했을때 알고리즘

    return {
        tailData,
        tailSection : tailSection.map(tails => tails.data)
    } ;
}

export default connect(mapStateToProps)(RoomCenterSection) ;