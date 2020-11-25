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

const SelectTail = ({ selectTail }) => {
    return (
        <Container>
            <Title>Select Tail</Title>
            <TailContainer 
                tailArray={selectTail}
            />
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