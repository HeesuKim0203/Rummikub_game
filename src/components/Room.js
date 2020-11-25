import React from 'react' ;
import styled from 'styled-components' ;

import LeftSection from './RoomLeftSection' ;
import CenterSection from './RoomCenterSection' ;
import RightSection from './RoomRightSection' ;

const Container = styled.div`
    width : 100% ;
    height : 100% ;

    display : flex ;
`;

const Room = () => {
    return (
        <Container>
            <LeftSection />
            <CenterSection />
            <RightSection />
        </Container>
    );
};

export default Room ;