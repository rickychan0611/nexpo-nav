import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Swiper from 'react-native-web-swiper';

export default function ImageSwiper({images}) {
  return (
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
        {images.map((uri, index) => {
          return (
            <Image source={{ uri }} key={index} />
          )
        })}

      </Swiper>
    </SlideContainer>
  )
};

const SlideContainer = styled.View`
      flex: 2;
      width: 100%;
      height: 50%;
`;

const Image = styled.Image`
      background-color: white;
      resize-mode: contain;
      width: 100%;
      height: 100%;
`;