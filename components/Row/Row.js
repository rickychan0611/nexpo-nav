import React from "react";
import styled from "styled-components/native";

export default function Row({ children }) {
  return (
    <Container>
      {children}
    </Container>
  )
};

const Container = styled.View`
 flex-direction: row;
 flex-wrap: nowrap;
 justify-content: space-between;
`;
