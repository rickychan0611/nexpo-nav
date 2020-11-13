import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Swiper from 'react-native-web-swiper';
import imagePlaceholder from "../../public/imagePlaceholder.jpg";

export default function ImageSwiper({ images, setImages }) {

  useEffect(() => {
    setImages(prev => prev)
  }, [])

  const Images = () => {
    if (images) {
      return (
        images.map(image => {
          return (
          <ImageContainer key={image.url}>
            <Image source={{ uri: image.url }} />
          </ImageContainer>
          )
        })
      )
    }

    else return (
      <>
      <ImageContainer>
        <Image source={imagePlaceholder} />
      </ImageContainer>
      <ImageContainer>
      <Image source={imagePlaceholder} />
    </ImageContainer>
    <ImageContainer>
    <Image source={imagePlaceholder} />
  </ImageContainer>
  </>
    )
  }

  return (
    <SlideContainer>
      <Text>{JSON.stringify(images)}</Text>
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
        <Images />
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