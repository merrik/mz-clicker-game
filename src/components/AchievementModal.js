import React, {Component} from 'react';
import styled, {keyframes} from "styled-components";
import PerfectScrollbar from 'perfect-scrollbar';
import Share from './Share';

const show = keyframes`
  0% {
    display: none;
    opacity: 0;
  }
  1% {
    display: flex;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  z-index: 100;
  transform-style: preserve-3d;
  perspective: 100px;
  display: ${props => props.fadeIn ? 'flex' : 'none'}
  align-items: center;
  align-content: center;
  justify-content: center;
  position: fixed;
  overflow-y: hidden;
  background: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;  
  transform: translateZ(100px);
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
  overflow-y: scroll;
  z-index: 9999;
  opacity: 1;
  max-width: 95%;
  max-height: 90%;
  padding: 0 20px;
  width: 450px;
  min-height: 460px;
  background: ${props => props.background ? props.background : 'auto'};
  animation: ${props => props.fadeIn ? `${show} 0.5s linear` : null};
  @media screen and (max-width: 1000px)  {
    width: 100%;
  }
`;

const Column = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1000px)  {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    margin: 40px 0 0 0;
  }
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 28px;
  font: bold 44px 'Graphik LC';
  color: black;
  text-align: center;
`;

const Description = styled.p`
  margin: 0;
  margin-bottom: 48px;
  font: 14px 'Fira Mono';
  color: #ffffff;
  text-align: center;
`;

const Accept = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 280px;
  height: 50px;
  color: white;
  border-radius: 24.5px;
  background-color: #0a9a8d;
  font: bold 12px 'Fira Mono';
  line-height: 1.67;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
`;

const ShareContainer = styled.div`
  margin-top: 30px;
`;

const ImgCircle = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin-bottom: 20px;
`;

export default class ModalContainer extends Component {
  scrollRef;

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.props.handleClose();
    }
  };

  closeModal = () => {
    this.props.handleClose();
  };

  componentDidMount() {
    new PerfectScrollbar(this.scrollRef);
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  hideModalOverlay = (e) => {
    if (e.target === e.currentTarget) {
      this.props.handleClose();
    }
  };


  render() {
    const {
      children,
      fadeIn,
      background,
      title,
      text,
      params,
      acceptText,
      img
    } = this.props;
    return (
      <Overlay onClick={this.hideModalOverlay} fadeIn={fadeIn} innerRef={(node) => {this.scrollRef = node}}>
        <Modal fadeIn={fadeIn} background={background}>
          <Column>
            {img ? (
              <ImgCircle
                src={img}
              />
            ) : null}
            <Title>{title}</Title>
            {text ? (
              <Description>{text}</Description>
            ) : null}
            <Accept onClick={this.closeModal}>
              {acceptText ? acceptText : 'Поехали'}
            </Accept>
            {
              typeof params === "object" ? (
                <ShareContainer>
                  <Share
                    params={params}
                  />
                </ShareContainer>
              ) : null
            }
          </Column>
        </Modal>
      </Overlay>
    )
  }
}