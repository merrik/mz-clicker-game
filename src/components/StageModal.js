import React, {Component} from 'react';
import styled, {keyframes} from "styled-components";
import PerfectScrollbar from 'perfect-scrollbar';

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
  background: ${props => props.background ? props.background : 'rgba(0, 0, 0, 0.9)'};
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;  
  transform: translateZ(100px);
`;

const Modal = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  overflow-y: scroll;
  z-index: 9999;
  opacity: 1;
  max-width: 95%;
  max-height: 90%;
  padding: 0 20px;
  min-width: 320px;
  animation: ${props => props.fadeIn ? `${show} 0.5s linear` : null};
`;

const Column = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 28px;
  font: bold 44px 'Graphik LC';
  color: #ffffff;
  text-align: center;
`;

const Description = styled.p`
  margin: 0;
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
  margin-top: 48px;
  color: white;
  border-radius: 24.5px;
  background-color: #ff8b86;
  font: bold 12px 'Fira Mono';
  line-height: 1.67;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
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


  render() {
    const { children, fadeIn, background, title, text } = this.props;
    return (
      <Overlay fadeIn={fadeIn} background={background} innerRef={(node) => {this.scrollRef = node}}>
        <Modal fadeIn={fadeIn}>
          <Column>
            <Title>{title}</Title>
            <Description>{text}</Description>
            <Accept onClick={this.closeModal}>Поехали</Accept>
          </Column>
        </Modal>
      </Overlay>
    )
  }
}