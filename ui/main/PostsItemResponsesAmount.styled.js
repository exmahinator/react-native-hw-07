import { Text } from "react-native";
import styled from "styled-components";

const PostsItemResponsesAmount = styled(Text)`
  color: ${(props) => (props.textIsHighlighted ? `#000` : `#bdbdbd`)};
  font-family: "Roboto-Regular";
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;

export default PostsItemResponsesAmount;
