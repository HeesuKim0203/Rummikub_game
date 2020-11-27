import React, { useState, useRef, useEffect } from 'react' ;
import styled from 'styled-components' ;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faClock } from '@fortawesome/free-solid-svg-icons' ;

import { connect } from 'react-redux' ;
import { createAction } from '../store' ;

const Container = styled.div`
    width : 100% ;
    height : 5% ;

    display : flex ;

    margin-bottom : 5px ;
`;

const TimeContainer = styled.div`
    width : 100% ;
    height : 80% ;

    margin : auto 0 ;
    
    display : flex ;
    justify-content : center ;
    align-items : center ;
`;

const Time = styled.div`
    width : 70% ;
    height : 100% ;

    margin-left : 30px ;
`;

const TimeCount = styled.div`
    width : ${props => `${100 - (100 / 30) * (30 - props.time)}%`} ;
    height : 100% ;
    
    background-color : #e53935 ;
    
    border-radius : 5px ;
    
`;

const TimeText = styled.span`
    width : 6% ;
    
    margin-left : 8px ;

    font-size : 16px ;
    text-align : center ;
`;

const Timer = ({ reducerTime, timeUpdate  }) => {

    const [ time, setTime ] = useState(reducerTime) ;
    const callBack = useRef() ;
    let clearTime ;

    callBack.current = () => {
        setTime(time - 1) ;
        timeUpdate(reducerTime - 1) ;
    } ;
    
    useEffect(() => {
        clearTime = setInterval(tick, 1000) ;
        function tick() {
            callBack.current() ;
        }

    }, []) ;

    useEffect(() => {
        if(time === 0) {
            console.log('턴 종료') ;
            setTime(30) ;
            clearInterval(clearTime) ;
        }

    }, [reducerTime]) ;

    return (
        <Container>
            <TimeContainer>
                <FontAwesomeIcon
                    icon={faClock}
                    size={"2x"}
                />
                <Time>
                    <TimeCount time={time}/>
                </Time>
                <TimeText>{time} 초</TimeText>
            </TimeContainer>
        </Container>
    );
};

function mapStateToProps(state) {
    const { time } = state ;
    return {
        reducerTime : time
    } ;
}

function mapDispatchToProps(dispatch) {
    return {
        timeUpdate : time => {
            dispatch( createAction.timeUpdate(time)) ;
        }
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Timer) ;