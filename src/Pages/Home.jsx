import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const stopVideo = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (video.srcObject) {
        const stream = video.srcObject;
        stream.getTracks().forEach((track) => track.stop());
      }
      video.srcObject = null;
    }
  }, []);

  const getVideo = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          min: 360,
          ideal: 1280,
          facingMode: "user",
        },
        audio: false,
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    const photo = photoRef.current;
    const canvas = canvasRef.current;
    let context = canvas.getContext("2d");
    const width = video.clientWidth;
    const height = video.clientHeight;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    setPhotoTaken(true);
    stopVideo();
    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  };

  const clearPhoto = () => {
    const photo = photoRef.current;
    photo.setAttribute("src", "");
  };

  useEffect(() => {
    if (modalIsOpen === true) {
      getVideo();
    } else if (modalIsOpen === false) {
      stopVideo();
    }
  }, [modalIsOpen, getVideo, stopVideo]);

  return (
    <HomeDiv>
      <TitleText>Process your cheque here</TitleText>
      <UploadDiv onClick={openModal}>
        <p>Take photo of cheque</p>
      </UploadDiv>
      <ModalDiv
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className="video-div" ref={containerRef}>
          <video ref={videoRef} />
          <img ref={photoRef} alt="cheque" src="" />
          <canvas ref={canvasRef} />
        </div>
        <div className="button-div">
          {photoTaken ? (
            <button
              onClick={() => {
                navigate("/processing");
              }}
            >
              Submit
            </button>
          ) : (
            <button onClick={() => takePhoto()}>Take photo</button>
          )}
          {photoTaken ? (
            <button
              onClick={() => {
                setPhotoTaken(false);
                getVideo();
                clearPhoto();
              }}
            >
              Retake
            </button>
          ) : (
            <button onClick={closeModal}>Cancel</button>
          )}
        </div>
      </ModalDiv>
    </HomeDiv>
  );
}

const HomeDiv = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  padding: 0 10rem;
  grid-template-columns: 50% 50%;

  @media (max-width: 765px) {
    grid-template-columns: 100%;
    padding: 0 5%;
  }
`;

const ModalDiv = styled(Modal)`
  width: 70%;
  min-height: 70vh;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(4px);
  padding: 3rem;
  border: 1px black solid;
  border-radius: 5px;

  .video-div {
    background-color: black;
    margin: 0 auto 2rem;
    margin-top: 3rem;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 90%;
    height: 80%;
    overflow: hidden;
    display: block;
  }

  video {
    min-width: 100%;
    min-height: 100%;

    width: auto;
    height: auto;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  img {
    min-width: 100%;
    min-height: 100%;

    width: auto;
    height: auto;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .button-div {
    position: absolute;
    top: 90%;
    width: calc(100% - 4rem);
  }

  button {
    float: right;
    margin: 0 0.5rem;
  }
`;

const TitleText = styled.p`
  font-size: 6.7rem;
  font-weight: 800;
  color: black;

  @media (max-width: 765px) {
    font-size: 4rem;
  }
`;

const UploadDiv = styled.div`
  height: 30rem;
  width: 100%;
  border: 2px black dashed;
  cursor: pointer;
  opacity: 0.4;
  transition: all 0.3s;

  :hover {
    opacity: 1;

    p {
      color: black;
    }
  }

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-weight: 400;
    font-size: 3rem;
    color: black;
  }

  @media (max-width: 765px) {
    margin-bottom: 50%;
    height: 40vh;
  }
`;

export default Home;
