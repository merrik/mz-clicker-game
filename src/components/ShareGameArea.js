import React, {Component} from 'react';
import styled from "styled-components";
import Share from './Share';
import {connect} from 'react-redux';

const Container = styled.span`
  display: flex;
  position: relative;
  width: 100%;
  border-bottom: 1px solid #434343;
  align-self: flex-start;
  font: 12px "Fira Mono";
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.5);
  text-align: start;
`;

const ShareContainer = styled.span`
  position: absolute;
  top: -20px;
  left: 40px;
`;


export default
@connect((state) => {
  return {
    params
  }
})
class ShareGameArea extends Component {
  render() {
    const {params} = this.props;
    return <Container>
      <ShareContainer>
        <Share
          params={params}
        />
      </ShareContainer>
    </Container>;
  }
}
