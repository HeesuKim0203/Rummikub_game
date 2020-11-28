import React from 'react' ;
import styled from 'styled-components' ;

import { connect } from 'react-redux' ;

import Tail from './Tail' ;
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
                        tail={tail}
                        fixed={true}
                    />
                )}
            </SelectTailContainer>
        </Container>
    );
};

function mapStateToProps(state) {
    const { 
        tail : { selectTail } 
    } = state ;
    
    return {
        selectTail
    } ;
}

export default connect(mapStateToProps)(SelectTail) ;
