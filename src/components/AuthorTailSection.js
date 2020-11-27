import React, { useEffect, useRef, useState } from 'react' ;
import { connect } from 'react-redux';
import styled from 'styled-components' ;
import { createAction } from '../store';

import TailContainer from './TailContainer' ;
import { TAIL_SECITON_HEIGHT } from './util' ;

const Container = styled.div`
    display : block ;

    height : ${`${TAIL_SECITON_HEIGHT}px`} ;     
`;

const AuthorTailSection = ({ id, tails, tail, tailSectionSetX }) => {

    const [ selectTail, setSelectTail ] = useState(null) ;
    const authorTailXY = useRef(null) ;

    useEffect(() => {
        
        console.log(authorTailXY.current.getBoundingClientRect()) ;
        const { x, y, width } = authorTailXY.current.getBoundingClientRect() ;

        console.log(width) ;
        tailSectionSetX(id, x, y, width) ;

    }, []) ;

    useEffect(() => {

        setSelectTail(tail) ;

    }, [tail]) ;

    function onMouseOverCheck(e) {
        // console.log(selectTail) ;
    }

    return (
        <Container
            onMouseOver={selectTail ? onMouseOverCheck : null }
            ref={authorTailXY}
        >
            <TailContainer 
                tailArray={tails}
            />
        </Container>
    );
};

function mapStateToProps(state) {
    const { tail } = state ;
    return {
        tail
    } ;
}

function mapDispatchToProps(dispatch) {
    return {
        tailSectionSetX : (id, x, y, width) =>
            dispatch(createAction.tailSectionSetX(id, x, y, width)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorTailSection) ;