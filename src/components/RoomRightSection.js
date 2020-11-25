import React, { useState } from 'react' ;
import styled from 'styled-components' ;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faDotCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons' ;

import { connect } from 'react-redux' ;
import { createAction } from '../store' ;

// button 모음 zone
const Container = styled.div`
    width : 13% ;
    height : 100% ;

    border : 1px solid #111 ;
`;

const Button = styled.button`
    all : unset ;
    
    width : 135px ;
    height : 35px ;

    border : 1px solid #111 ;
    border-radius : 15px ;

    text-align : center ;
`;

const ButtonContainer = styled.ul`
    width : 100% ;
    height : 100% ;
`;

const ButtonLi = styled.li`
    width : 100% ;
    height : 15% ;

    display : flex ;
    justify-content : center ;
    align-items : center ;

    &:not(:last-child) {
        border-bottom : 1px solid #111 ;
    }

    &:last-child {
        height : 40% ;
    }
`;

const AlignmentButton = styled(Button)`

`;

const SeatResetButton = styled(Button)`

`;

const Form = styled.form`

`;

const NextTurnButton = styled(Button)`
    height : 200px ;
`;

const CodeText = styled.span`

`;

const RoomRightSection = ({ resetPosition, ascTail, selectTail }) => {
    const [ answerStatus, setAnswerStatus ] = useState(false) ;

    const useTailEvent = selectTail.length ? false : true ;    

    useState(() => {
        setAnswerStatus(checkTails(useTailEvent)) ;
    }, [ useTailEvent ]) ;

    function ascTailOnClick() {
        ascTail() ;
    }

    function resetPositionOnClick() {
        resetPosition() ;
    }

    function checkTails(tailLen) {
        if(tailLen == 3) {

        }else {
            
        }
    }

    return (
        <Container>
            <ButtonContainer>
                <ButtonLi>
                    <CodeText>
                        XSIL24L
                    </CodeText>
                </ButtonLi>
                <ButtonLi>
                    <AlignmentButton>
                        색깔 별로
                    </AlignmentButton>
                </ButtonLi>
                <ButtonLi>
                    <AlignmentButton
                        onClick={() => {
                            return useTailEvent ? ascTailOnClick() : null ;
                        }}
                    >
                        오름 차순
                    </AlignmentButton>
                </ButtonLi>
                <ButtonLi>
                    <SeatResetButton
                        onClick={resetPositionOnClick}
                    >
                        원래대로
                    </SeatResetButton>
                </ButtonLi>
                <ButtonLi>
                    <Form>
                        <NextTurnButton type="submit">
                            {answerStatus ? 
                            <FontAwesomeIcon icon={faDotCircle}  size="7x" color="#558b2f" /> 
                            : <FontAwesomeIcon icon={faTimesCircle}  size="7x" color="#c62828" /> }
                        </NextTurnButton>
                    </Form>
                </ButtonLi>
            </ButtonContainer>
        </Container>
    );
};

function mapStateToProps(state) {
    const { selectTail } = state ;
    return {
        selectTail
    } ;
}

function mapDispatchToProps(dispatch) {
    return {
        resetPosition : () => {
            dispatch(createAction.resetPosition()) ;
        },
        ascTail : () => {
            dispatch(createAction.ascTail()) ;
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomRightSection) ;