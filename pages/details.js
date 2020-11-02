
import React, { useContext } from "react";
import { Context } from "../context/Context";
import { ThemeProvider, Button } from 'react-native-elements';
import { View, Text, TouchableOpacity } from "react-native";
import { Link, useRouting } from "expo-next-react-navigation";
import styled from "styled-components/native";
import BottomBar from "../components/BottomBar";
import Swiper from 'react-native-web-swiper';

export default function Details() {
  const { navigate } = useRouting();
  const { user } = useContext(Context);

  return (
    <>
      <ContextArea>
        <SlideContainer>
          <Swiper
            from={1}
            minDistanceForAction={0.1}
            controlsProps={{
              dotsTouchable: true,
              prevPos: 'left',
              nextPos: 'right',
              nextTitle: '>',
              nextTitleStyle: { color: 'black', fontSize: 24, fontWeight: '700' },
              PrevComponent: ({ onPress }) => (
                <TouchableOpacity onPress={onPress}>
                  <Text style={{ color: 'black', fontSize: 24, fontWeight: '700' }}>
                    {'<'}
                  </Text>
                </TouchableOpacity>
              ),
            }}
          >
            <Image source={{ uri: "https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg" }} />
            <Image source={{ uri: "https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg" }} />
            <Image source={{ uri: "https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg" }} />
            <Image source={{ uri: "https://cdn3.volusion.com/hckyx.hepad/v/vspfiles/photos/CONC-REDAPPLE-2.jpg" }} />

          </Swiper>
        </SlideContainer>
      </ContextArea>
      <BottomBar />
    </>
  );
}

const ContextArea = styled.View`
      flex: 1;
      align-items: center;
      background-color: white;
      width: 100%;
      max-width: 500px;
`;
const SlideContainer = styled.View`
      flex: 1;
      width: 100%;
      max-height: 40%;
`;
const Image = styled.Image`
      background-color: white;
      resize-mode: contain;
      width: 100%;
      height: 100%;
`;