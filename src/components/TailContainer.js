import React from 'react' ;
import styled from 'styled-components' ;

import Tail from './Tail' ;

const Container = styled.div`
    display : flex ;
    flex-direction : row ;
`;

const TailContainer = ({ tailArray }) => {
    return (
        <Container>
             {tailArray && tailArray.map((tail, index) =>
                <Tail 
                    key={index} 
                    id={index} 
                    color={tail.color}
                    num={tail.num}
                />
            )}
        </Container>
    ) ;
} ;

export default TailContainer ;