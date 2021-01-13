import React from "react";
import { Platform } from "react-native";
import useWindowSize from "../hooks/useWindowSize"

import AppWrapper from "../components/AppWrapper";

import Home_Web_LG from "../layouts/Home_Web_LG";
import Home_Web_XS from "../layouts/Home_Web_XS";
import Home_Mobile_XS from "../layouts/Home_Mobile_XS";
import { ScrollView } from "react-native-gesture-handler";

export default function Home() {
  const { vh, vw } = useWindowSize();

  return (
    <AppWrapper>
      <ScrollView>
        {Platform.OS === "web" &&
          <>
            {
              vw > 690 ?
                <Home_Web_LG /> :
                <Home_Web_XS vw={vw} />
            }
          </>
        }

        {Platform.OS !== "web" && <Home_Mobile_XS />}
      </ScrollView>
    </AppWrapper>
  );
}
