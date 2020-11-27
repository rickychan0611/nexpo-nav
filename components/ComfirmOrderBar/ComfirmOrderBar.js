import React, { useContext } from "react";
import { Platform } from "react-native";
import { useRouting } from "expo-next-react-navigation";
import useQty from '../../hooks/useQty';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { IconButton } from "react-native-paper";
import styled from 'styled-components/native';
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";

export default function ComfirmOrderBar({ cancel }) {
  const { navigate } = useRouting();
  const { setSelected, total, user } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const qty = useQty();

  return (
    <>
      <Wrapper onPress={() => {
        if (user) {
          onSubmit()
        }
        else {
          setSelected("login")
          navigate({
            routeName: "login",
          })
        }
      }}>
        <Bar theme={theme} cancel={cancel} >
          {cancel ?
            <>
              <IconButton
                icon="close"
                color="white"
                onPress={() => {
                  setSelected("cart")
                  navigate({
                    routeName: "cart",
                  })
                }} />
            </>
            :
            <>
              <IconButton icon="check" color="white"
                onPress={() => {
                  // onSubmit()
                }} />
              <Total>
                Place Order
              </Total>
            </>
          }
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
  background-color: ${props => props.cancel ? props.theme.black : props.theme.green}; 
  height: 40px;
  width: 90%;
  border-radius: 25px;
`;
const Wrapper = styled.TouchableOpacity`
  position: ${Platform.OS === "web" ? `fixed` : `absolute`};
  bottom: 68px;
  height: 55px;
  width: 100%;
  max-width: 500px;
  /* flex: 1; */
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;
