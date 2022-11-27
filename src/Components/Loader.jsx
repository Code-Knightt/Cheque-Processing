import React from "react";
import styled from "styled-components";

function Loader() {
  return (
    <LoadingDiv>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </LoadingDiv>
  );
}

const LoadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;

  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 200px;
    height: 200px;
  }
  .lds-ripple div {
    position: absolute;
    border: 5px solid #ade792;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 96px;
      left: 96px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    4.9% {
      top: 96px;
      left: 96px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    5% {
      top: 96px;
      left: 96px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 192px;
      height: 192px;
      opacity: 0;
    }
  }
`;

export default Loader;
