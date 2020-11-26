import { createGlobalStyle } from 'styled-components' ;
import rest from 'styled-reset' ;

// import backgroundImg from '../assets/backgroundImg.jpg'

/* body {
    background-image : url(${backgroundImg}) ;
    background-repeat : no-repeat ;
    background-position : 10px cover ;
    background-size : cover ;
} */

const GlobalStyled = createGlobalStyle`
    ${rest}
    #root {
        width : 1250px ;
        height : 575px ;
        margin : auto ;
        font-size : 12px ;
    }
    * {
        padding : 0 ;
        margin : 0 ;
        box-sizing : border-box ;
    }
    a {
        text-decoration : none ;
        color : black ;

        &:hover {
            color : black ;
        }
    }
`;

export default GlobalStyled ;