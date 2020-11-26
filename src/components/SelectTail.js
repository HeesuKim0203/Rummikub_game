import React, { useState } from 'react' ;
import styled from 'styled-components' ;

import { connect } from 'react-redux' ;
import { createAction } from '../store' ;

import Tail from './Tail' ;
import TailContainer from './TailContainer' ;
import { TAIL_WIDTH } from './util' ;

const Container = styled.div`

    width : ${`${TAIL_WIDTH * 3}px`} ;

    position : fixed ;
    
    top : 376px ;
    left : 170px ;
`;

const Title = styled.h4`
    margin-bottom : 3px ;
    text-align : center ;
`;

const SelectTailContainer = styled.div`
    display : flex ;
    flex-direction : row ;
    
    border-radius : 5px ; 
`;

const SelectTail = ({ selectTail }) => {
    return (
        <Container>
            <Title>Select Tail</Title>
            <SelectTailContainer>
                {selectTail && selectTail.map((tail, index) =>
                    <Tail 
                        key={index} 
                        id={index} 
                        color={tail.color}
                        num={tail.num}
                    />
                )}
            </SelectTailContainer>
        </Container>
    );
};

function mapStateToProps(state) {
    const { selectTail } = state ;
    return {
        selectTail
    } ;
}

// function mapDispatchToProps(dispatch) {
//     return {
//         addTail : tail => {
//             dispatch( createAction.addTailSection(tail)) ;
//         }
//     }
// }

export default connect(mapStateToProps)(SelectTail) ;