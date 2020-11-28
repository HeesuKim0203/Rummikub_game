import React, { useEffect, useRef } from 'react' ;
import { connect } from 'react-redux';
import styled from 'styled-components' ;

import createAction from '../storeEX/action';

import TailContainer from './TailContainer' ;
import { TAIL_SECITON_HEIGHT } from './util' ;

const Container = styled.div`
    display : block ;

    height : ${`${TAIL_SECITON_HEIGHT}px`} ;     
`;

const AuthorTailSection = ({ id, tails, setTailSection }) => {

    // const [ selectTail, setSelectTail ] = useState(null) ;
    const authorTailXY = useRef(null) ;

    console.log(tails) ;

    useEffect(() => {
        
        const { x, y, width } = authorTailXY.current.getBoundingClientRect() ;
        setTailSection(id, x, y, width) ;

    }, []) ;

    return (
        <Container
            ref={authorTailXY}
        >
            <TailContainer 
                tailArray={tails}
            />
        </Container>
    );
};

function mapDispatchToProps(dispatch) {
    return {
        setTailSection : (id, x, y, width) =>
            dispatch(createAction.setTailSection(id, x, y, width)),
    }
}

export default connect(null, mapDispatchToProps)(AuthorTailSection) ;