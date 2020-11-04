import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Swiper from 'react-native-web-swiper';

export default function ImageSwiper({ images }) {
  return (
    <SlideContainer>
      {images &&
        <Swiper
          from={0}
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
          {images.map((image, index) => {
            return (
              <ImageContainer key={index}>
                <Image source={{ uri: image.url }} />
              </ImageContainer>
            )
          })}

        </Swiper>
      }
    </SlideContainer>
  )
};

const SlideContainer = styled.View`
      flex: 2;
      width: 100%;
      height: 50%;
      justify-content: center;
      /* align-items: center; */
`;

const ImageContainer = styled.View`
      flex: 1;
      justify-content: center;
      align-items: center;
      padding: 0 30px 0 30px;
`;
const Image = styled.Image`
      background-color: white;
      resize-mode: contain;
      width: 100%;
      height: 100%;
`;