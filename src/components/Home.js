import React, { useEffect, useState } from 'react' ;
import styled from 'styled-components' ;

import io from 'socket.io-client' ;

const ENDPOINT = 'http://192.168.0.30:9300/chat/231' ;

const Container = styled.div`
    width : 100% ;
    height : 100% ;
`;

const Title = styled.h1`
     padding-top : 120px ;

    text-align : center ;
    font-size : 48px ;
    font-weight : 550 ;

    user-select : none ;
`;

const ButtonContainer = styled.div`
    width : 20% ;
    margin : 100px auto 0 auto ;

    display : flex ;
    justify-items : center ;
    align-items : center ;
    flex-direction: column ;
`;

const Input = styled.input`
    all : unset ;

    width : 100% ;
    height : 40px ;

    border : 1px solid #111 ;
    border-radius : 15px ;

    text-align : center ;
    margin-top : 10px ;
`;

const RoomFindButton = styled(Input)`
    
`;

const RoomCreateButton = styled(Input)`

`;

const Form = styled.form`
    width : 100% ;
    display : flex ;
`;

const CodeInput = styled(Input)`
    margin-right : 10px ;
`;

const CodeButton = styled(Input)`
    width : 70px ;
`;

let socket ;

const Home = () => {
    const [ load, setLoad ] = useState(true) ;

    useEffect(() => {
        try {

            socket = io(ENDPOINT) ;
            
            console.log(socket) ;

        } catch {
            
        } finally {
            setLoad(false) ;   
        }
    }, []) ;

    function RoomFindOnClick() {

    }

    function RoomCreateOnClick() {

    }

    function codeOnSubmit() {
        
    }

    function CodeButtonOnClick() {

    }
    return (
        <Container>
            <Title>
                Rummikub
            </Title>
            <ButtonContainer>
                <RoomFindButton type="button" value="방 생성" />
                <RoomCreateButton type="button" value="방 참가" />
                <Form>
                    <CodeInput type="text" placeholder="코드입력"/>
                    <CodeButton type="submit" value="참가"/>
                </Form>
            </ButtonContainer>
        </Container>
    );
};

export default Home;