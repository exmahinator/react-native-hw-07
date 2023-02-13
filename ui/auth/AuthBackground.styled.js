import { ImageBackground } from "react-native";
import styled from "styled-components";

const AuthBackground = styled(ImageBackground)`
flex: 1;
background-size: cover;
justify-content: flex-end;
align-items: stretch;
padding-bottom: ${(props) => (props.keyboardIsShown ? `72px` : `0`)};
`

export default AuthBackground