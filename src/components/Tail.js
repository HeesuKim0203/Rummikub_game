import React, { useEffect, useState } from 'react' ;
import styled from 'styled-components' ;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faMeh } from '@fortawesome/free-solid-svg-icons' ;

import { connect } from 'react-redux' ;
import { createAction } from '../store';

import { 
    TAIL_WIDTH, 
    TAIL_HEIGHT, 
    CENTER_CONTAINER_WITDH,
    CENTER_CONTAINER_HEIGHT,
    WALL_COLLISION
 } from './util' ;

const Container = styled.div.attrs(props => ({
    style : {
        position : props.position,
        top : props.y,
        left :props.x,
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

const Tail = ({ ContainerX, ContainerY, color, num, tail, selectTail, addTail, deleteTail }) => {

    const selectState = tail && selectTail.some(select_tail => select_tail.id === tail.id) ;

    const [ downState, setDownState ] = useState(false) ;
    const [ initialX, setInitialX ] = useState(0) ;
    const [ initialY, setInitialY ] = useState(0) ;

    // 상태 변환 용 y 좌표
    const [ x, setX ] = useState(0) ;
    const [ y, setY ] = useState(0) ;

    const [ select, setSelect ] =  useState(selectState)  ;

    useEffect(() => {
        setSelect(selectState) ;
    }, [ selectState ]) ;

    // select tail 개수
    const selectTailNum = selectTail.length ;

    function onMouseDown(e) {
        e.stopPropagation() ;

        if( !tail ) return ;
            
        setInitialX(e.nativeEvent.offsetX) ;
        setInitialY(e.nativeEvent.offsetY) ;

        selectTailNum < 3 || select ?  setDownState(true) : setDownState(false)   ;
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
        const overlappingCheckValue = selectTail.some(tailValue => tailValue.id === tail.id) ;
        const selectStandard = 458 - TAIL_HEIGHT / 2

        if(y !== 0) {
            if(y <= selectStandard) {

                if(selectTailNum === 0 || !overlappingCheckValue)
                    addTail(tail) ;
            }else {
                setSelect(false) ;

                if(selectTailNum > 0 && overlappingCheckValue)
                    deleteTail(tail.id) ;
            }
        }
        setDownState(false) ;
    }
    function eventInit(downState, event, ...parms) {
        return downState ? e => event(e, ...parms) : null ;
    }

    return (
        <Container
            onMouseDown={onMouseDown}
            onMouseMove={eventInit(downState, onMouseMove)}
            onMouseUp ={eventInit(downState, eventOut)}
            onMouseLeave={eventInit(downState, eventOut)}
            border={select ? '2px solid #ef5350' : '1px solid #f0f4c3'}
            position={select ? 'absolute' : 'static' }
            x={select ? `${x}px` : '0'}
            y={select ? `${y}px` : '0'}
        >
            <TextContainer>
                <Text color={color}>
                    {num !== -1 ? num : (
                        <FontAwesomeIcon
                            icon={faMeh} 
                            color={color}
                            size="2x"
                        />
                    )}
                </Text>
            </TextContainer>
        </Container>
    )
} ;

function mapStateToProps(state) {
    const { selectTail } = state ;
    return {
        selectTail
    } ;
}

function mapDispatchToProps(dispatch) {
    return {
        addTail : tail => {
            dispatch(createAction.addTail(tail)) ;
        },
        deleteTail : id => {
            dispatch(createAction.deleteTail(id)) ;
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tail) ;