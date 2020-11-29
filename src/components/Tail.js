import React, { useEffect, useState } from 'react' ;
import styled from 'styled-components' ;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faMeh } from '@fortawesome/free-solid-svg-icons' ;

import { 
    TAIL_WIDTH, 
    TAIL_HEIGHT, 
    CENTER_CONTAINER_WITDH,
    CENTER_CONTAINER_HEIGHT,
    WALL_COLLISION,
    TAIL_SECITON_HEIGHT
 } from './util' ;
 
import { connect } from 'react-redux';
import createAction from '../storeEX/action';

const Container = styled.div.attrs(props => ({
    style : {
        position : props.position,
        top : props.y,
        left :props.x,
        zIndex : props.zIndex
    }
}))`
    width : ${`${TAIL_WIDTH}px`} ;
    height : ${`${TAIL_HEIGHT}px`} ;

    padding : 3px 8px 0 8px ;

    border : ${props => props.border} ;
    border-radius : 6px ;

    background-color : #dce775 ;
    user-select : none ;

`;

const TextContainer = styled.div`
    width : 100% ;
    height : 25px ;

    border-radius : 50% ;

    display : flex ;
    justify-content : center ;
    align-items : center ;

    box-shadow : inset 0px 0px 3px #555 ;
    
    background-color : ${props => props.color} ;
`;

const Text = styled.span`
    font-size : 14px ;
    font-weight : 600 ;
    pointer-events : none ;

    color : ${props => props.color} ;
`;

const Tail = ({ 
    ContainerX, 
    ContainerY, 
    tail, 
    fixed,
    moveTailNum,
    moveTail,
    tailClick,
    tailClickOut,
    tailSectionTailAdd,
    tailSectionWallData,
    moveTailFun
}) => {

    const [ downState, setDownState ] = useState(false) ;
    const [ initialX, setInitialX ] = useState(0) ;
    const [ initialY, setInitialY ] = useState(0) ;
    const [ x, setX ] = useState(0) ;
    const [ y, setY ] = useState(0) ;
    const [ select, setSelect ] = useState(tail.select) ;

    useEffect(() => {
        const { x, y, select } = tail ;
        setX(x);
        setY(y) ;
        setSelect(select) ;
    }, [tail]) ;

    function onMouseDown(e) {
        e.stopPropagation() ;

        if( !tail ) return ;
            
        setInitialX(e.nativeEvent.offsetX) ;
        setInitialY(e.nativeEvent.offsetY) ;

        setDownState(true) ;
    }

    function onMouseMove(e) {

        let left = Number(e.pageX) - initialX ; 
        let top = Number(e.pageY) - initialY ; 

        if(left  < ContainerX ) {
            left = ContainerX + WALL_COLLISION ;
            eventOut() ;
        }
        //937.5
        if(left > ContainerX + CENTER_CONTAINER_WITDH - TAIL_WIDTH) {
            left = ContainerX + CENTER_CONTAINER_WITDH - TAIL_WIDTH - WALL_COLLISION ;
            eventOut() ;
        }
        if(top < ContainerY) {
            top = ContainerY + WALL_COLLISION ;
            eventOut() ;
        }
        if(top > CENTER_CONTAINER_HEIGHT - TAIL_HEIGHT) {
            top = CENTER_CONTAINER_HEIGHT - TAIL_HEIGHT - WALL_COLLISION ;
            eventOut() ;
        }
        

        setX(left) ;
        setY(top) ;
        setSelect(true) ;

    }
    // event 해제
    function eventOut(e) {
        const overlappingCheckValue = moveTail.some(tailValue => tailValue.id === tail.id) ;
        const selectStandard = 458 - TAIL_HEIGHT / 2

        if(y !== 0) {
            if(y <= selectStandard) {

                if((moveTailNum === 0 || !overlappingCheckValue) && typeof tail.section !== 'number')
                    tailClickOut(tail, x, y) ;

                if(typeof tail.section === 'number') {
                    moveTailFun(tail.section, tail, x, y, select)
                }

            }else {
                setSelect(false) ;

                if(moveTailNum > 0 && overlappingCheckValue)
                    tailClick(tail, x, y) ;
            }
        }

        tailSectionWallData.forEach((sectionWallData, index) => {
            if(x > sectionWallData.x && x < sectionWallData.x + sectionWallData.width && typeof tail.section !== 'number') {
                if(y > sectionWallData.y && y < sectionWallData.y + TAIL_SECITON_HEIGHT) {
                    tailSectionTailAdd(index, tail, select) ;
                }
            }
        }) ;
        setDownState(false) ;
    }
    function eventInit(downState, event, ...parms) {
        return downState ? e => event(e, ...parms) : null ;
    }

    return (
        <>
            { !fixed ? (
                <Container
                    onMouseDown={onMouseDown}
                    onMouseMove={eventInit(downState, onMouseMove)}
                    onMouseUp ={eventInit(downState, eventOut)}
                    onMouseLeave={eventInit(downState, eventOut)}
                    border={select ? '2px solid #ef5350' : '1px solid #f0f4c3'}
                    position={select ? (typeof section === 'number' ? 'static' : 'absolute') : 'static' }
                    x={select ? `${x}px` : '0'}
                    y={select ? `${y}px` : '0'}
                    zIndex={downState ? '1000' : '1'}
                    draggable="false"
                >
                    <TextContainer>
                        <Text color={tail.color}>
                            {tail.num !== -1 ? tail.num : (
                                <FontAwesomeIcon
                                    icon={faMeh} 
                                    color={tail.color}
                                    size="2x"
                                />
                            )}
                        </Text>
                    </TextContainer>
                </Container>
            ) : (
                <Container>
                    <TextContainer>
                        <Text color={tail.color}>
                            {tail.num !== -1 ? tail.num : (
                                <FontAwesomeIcon
                                    icon={faMeh} 
                                    color={tail.color}
                                    size="2x"
                                />
                            )}
                        </Text>
                    </TextContainer>
                </Container>
            )}
        </>
    )
} ;

function mapStateToProps(state) {
    const { 
        tail : { selectTail, tailSection, moveTail }  
    } = state ;
    return {
        moveTailNum : moveTail.length,
        moveTail,
        tailSectionWallData : tailSection.map(tails => ({ x : tails.x, y : tails.y, width : tails.width }))
    }
}

function mapDispatchToProps(dispatch) {
    return {
        tailClick : (tail, x, y) =>
            dispatch(createAction.tailClick(tail, x, y)),
        tailClickOut : (tail, x, y) => 
            dispatch(createAction.tailClickOut(tail, x, y)),
        tailSectionTailAdd : (id, tail, select) => 
            dispatch(createAction.tailSectionTailAdd(id, tail, select)),
        moveTailFun : (sectionId, tail, x, y, select) =>
            dispatch(createAction.moveTailFun(sectionId, tail, x, y, select)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tail) ;