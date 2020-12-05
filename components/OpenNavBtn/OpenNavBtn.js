import React, { useContext, useEffect } from "react";
import { Platform, View, Linking } from "react-native";
import { useRouting } from "expo-next-react-navigation";
import useQty from '../../hooks/useQty';
import { IconButton } from "react-native-paper";
import styled from 'styled-components/native';
import { Context } from "../../context/Context";
import { ThemeContext } from "../../context/ThemeContext";

export default function OpenNavBtn({ mapResponse, origin, destination }) {
  const { navigate } = useRouting();
  const { setSelected, total, user, newOrderProductList } = useContext(Context);
  const { theme } = useContext(ThemeContext);
  const qty = useQty();
  let url = ""

  const mapUrl = () => {
    let point = ""
    mapResponse.request.waypoints.map((item) => {
      point = point + item.location.query + "|"
      // return point
    })
    return (
      encodeURI(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving&waypoints=${point}`)
    )
  }
  useEffect(() => {
    console.log(mapUrl())
  }, [])


  return (
    <>
      <Wrapper
      >
        <Bar theme={theme}
          accessibilityRole='link'
          href={mapUrl()}
          target='_blank'>
          <IconButton icon="google-maps" color="white"></IconButton>
          <Total>
            Start Navigation
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
