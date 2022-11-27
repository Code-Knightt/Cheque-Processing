import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Submitted() {
  return (
    <Div>
      <h1>Cheque has been submitted</h1>
      <br />
      <h1>It will be processed shortly</h1>
      <Link to="/">Scan another</Link>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

export default Submitted;
