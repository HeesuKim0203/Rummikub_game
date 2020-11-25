import React from 'react' ;
import styled from 'styled-components' ;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faUser } from '@fortawesome/free-solid-svg-icons' ;

const Container = styled.div`
    width : 12% ;
    height : 100% ;
    border : 1px solid #111 ;
`;

const CardNumText = styled.span`
    width : 30px ;
    height : 30px ;

    text-align : center ;
    line-height : 28px ;

    border-radius : 15px ;
    border : 1px solid #111 ;

    margin-left : 5px ;
`;

const UserUl = styled.ul`
    width : 100% ;
    height : 100% ;
`;

const UserLi = styled.li`
    width : 100% ;
    height : 25% ;

    display : flex ;
    justify-content : center ;
    align-items : center ;

    &:not(:last-child) {
        border-bottom : 1px solid #111 ;
    }
`;

const RoomLeftSection = () => {
    return (
        <Container>
            <UserUl>
                <UserLi>
                    <FontAwesomeIcon icon={faUser} size="8x"/>
                    <CardNumText>0</CardNumText>
                </UserLi>
                <UserLi>
                    <FontAwesomeIcon icon={faUser} size="8x"/>
                    <CardNumText>0</CardNumText>
                </UserLi>
                <UserLi>
                    <FontAwesomeIcon icon={faUser} size="8x"/>
                    <CardNumText>0</CardNumText>
                </UserLi>
                <UserLi>
                    <FontAwesomeIcon icon={faUser} size="8x"/>
                    <CardNumText>0</CardNumText>
                </UserLi>
            </UserUl>
        </Container>
    );
};

export default RoomLeftSection;