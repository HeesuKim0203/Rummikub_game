import React, { useEffect } from 'react' ;
import styled from 'styled-components' ;

import LeftSection from './RoomLeftSection' ;
import CenterSection from './RoomCenterSection' ;
import RightSection from './RoomRightSection' ;

// import axios from 'axios' ;

// const api = axios.create({
//     baseURL : 'http://192.168.0.30:9300/chat/rumi' 
// })

const Container = styled.div`
    width : 100% ;
    height : 100% ;

    margin : 0 auto ;
    display : flex ;
`;

// let socket ;

const Room = () => {

    // useEffect(async () => {
    //     const { 
    //         data : {
    //             roomNumber
    //         } 
    //     } = await api.get('/roomnum') ;

    //     socket = new window.WebSocket(`ws://192.168.0.30:9300/ws/chat/${roomNumber}/`) ;

    //     socket.onmessage = socketOnMessage ;

    // }, []) ;

    // function socketOnMessage(e) {
    //     const data = JSON.parse(e.data) ;
    //     const { message } = data ;

    //     console.log(message) ;
    // }
    return (
        <Container>
            <LeftSection />
            <CenterSection />
            <RightSection />
        </Container>
    );
};

export default Room ;