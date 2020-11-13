import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Swiper from 'react-native-web-swiper';
import imagePlaceholder from "../../public/imagePlaceholder.jpg";

export default function ImageSwiper({ images }) {
  return (
    <SlideContainer>
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
        {images[0] ?
          images.map((image, index) => {
            console.log(image.url)
            return (
              <ImageContainer key={index}>
                <Image source={{ uri: image.url }} />
              </ImageContainer>
            )
          }) :
          <ImageContainer>
            <Image source={imagePlaceholder} />
          </ImageContainer>
        }
      </Swiper>
    </SlideContainer>
  )
};

const SlideContainer = styled.View`
      /* flex: 2; */
      width: 100%;
      justify-content: center;
      height: 300px;
      /* align-items: center; */
`;

const ImageContainer = styled.View`
      flex: 1;
      justify-content: center;
      align-items: center;
      /* padding: 30px; */
`;
const Image = styled.Image`
      background-color: white;
      resize-mode: contain;
      width: 100%;
      height: 100%;
`;