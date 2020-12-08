import React, { useContext, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Swiper from 'react-native-web-swiper';
import imagePlaceholder from "../../public/imagePlaceholder.jpg";
import { Context } from "../../context/Context";
import { ActivityIndicator, Colors } from 'react-native-paper';

export default function ImageSwiper({ images, uploading }) {
  const swiperRef = useRef(null);
  const {swiperControl, setSwiperControl} = useContext(Context);
  
  useEffect(()=>{
    setSwiperControl(swiperRef)
  },[])

  return (
    <SlideContainer>
      {images && images[0] && !uploading?

        <Swiper
          ref={swiperRef}
          from={0}
          minDistanceForAction={0.1}
          controlsProps={{
            dotsTouchable: true,
            prevPos: 'left',
            nextPos: 'right',
            nextTitle: '>',
            nextTitleStyle: { color: 'black', fontSize: 24, fontWeight: "bold" },
            PrevComponent: ({ onPress }) => (
              <TouchableOpacity onPress={onPress}>
                <Text style={{ color: 'black', fontSize: 24, fontWeight: "bold" }}>
                  {'<'}
                </Text>
              </TouchableOpacity>
            ),
          }}
        >
          {images && images[0] && images.map(image => {
            return (
              <ImageContainer key={image.url}>
                <Image source={{ uri: image.url }} />
              </ImageContainer>
            )
          })
          }
        </Swiper>
        :
        <ImageContainer>
          {uploading ? <ActivityIndicator size="large" animating={true} /> : <Image source={imagePlaceholder} />}
        </ImageContainer>
      }

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