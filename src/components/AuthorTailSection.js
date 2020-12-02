import React, { useEffect, useRef } from 'react' ;
import { connect } from 'react-redux';
import styled from 'styled-components' ;

import createAction from '../storeEX/action';

import TailContainer from './TailContainer' ;
import { TAIL_SECITON_HEIGHT, TAIL_WIDTH } from './util' ;

const Container = styled.div`
    display : block ;

    width : ${props =>`${props.tailNum * TAIL_WIDTH}px`} ;
    height : ${`${TAIL_SECITON_HEIGHT + 4}px`} ;     

    border : ${props => props.tailNum * TAIL_WIDTH === 0 ? 'none' : "2px solid #111"} ;

`;

const AuthorTailSection = ({ id, tails, setTailSection }) => {

    const authorTailXY = useRef(null) ;

    useEffect(() => {
        const { x, y, width } = authorTailXY.current.getBoundingClientRect() ;
        setTailSection(id, x, y, width) ;
    }, []) ;

    return (
        <Container
            ref={authorTailXY}
            tailNum={tails.length}
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