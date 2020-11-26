import React from 'react' ;
import styled from 'styled-components' ;

import TailContainer from './TailContainer' ;

const Container = styled.div`

`;

const AuthorTailSection = ({ tails }) => {
    console.log(tails) ;
    return (
        <Container>
            <TailContainer 
                tailArray={tails}
            />
        </Container>
    );
};

export default AuthorTailSection ;