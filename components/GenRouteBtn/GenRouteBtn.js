import React, { useContext } from "react";
import { Platform } from "react-native";
import { useRouting } from "expo-next-react-navigation";
import useQty from '../../hooks/useQty';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { IconButton } from "react-native-paper";
import styled from 'styled-components/native';
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";

export default function GenRouteBtn({ onSubmit }) {
  const { navigate } = useRouting();
  const { setSelected, total, user, newOrderProductList } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const qty = useQty();

  return (
    <>
      <Wrapper onPress={() => {
        onSubmit()
      }}>
        <Bar theme={theme}>
          <IconButton icon="map-search" color="white"></IconButton>
          <Total>
            Generate Route
          </Total>
        </Bar>
      </Wrapper>
    </>
  )
};

const Total = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
const Qty = styled.Text`
  color: white;
  border-width: 1px;
  border-radius: 5px;
  border-color: white;
  padding: 4px;
  text-align: center;
  font-size: 13px;
  margin: 0 30px;
`;
const Bar = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  background-color: ${props => props.theme.black}; 
  height: 40px;
  width: 90%;
  border-radius: 25px;
`;
const Wrapper = styled.TouchableOpacity`
  position: ${Platform.OS === "web" ? `fixed` : `absolute`};
  bottom: 20px;
  height: 55px;
  width: 100%;
  max-width: 500px;
  /* flex: 1; */
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;