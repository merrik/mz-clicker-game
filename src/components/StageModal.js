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
  transform-style: preserve-3d;
  perspective: 100px;
  display: ${props => props.fadeIn ? 'flex' : 'none'}
  align-items: center;
  align-content: center;
  justify-content: center;
  position: fixed;
  overflow-y: scroll;
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
  z-index: 9999;
  opacity: 1;
  max-width: 95%;
  max-height: 90%;
  /* /* overflow: auto; */
  /* overflow-y: auto; */ */
  /* overflow-x: hidden; */
  padding: 0 20px;
  min-width: 320px;
  animation: ${props => props.fadeIn ? `${show} 0.5s linear` : null};
  @media(min-width: 980px) {
    margin-top: 173px;
  }
`;

const Column = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default class ModalContainer extends Component {
  scrollRef;

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.props.handleClose();
    }
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
    const { children, fadeIn, background, title, text } = this.props;
    return (
      <Overlay onClick={e => this.hideModalOverlay(e)} fadeIn={fadeIn} background={background} innerRef={(node) => {this.scrollRef = node}}>
        <Modal fadeIn={fadeIn}>
          {title}
          <Column>
            {text}
          </Column>
        </Modal>
      </Overlay>
    )
  }
}