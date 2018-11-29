import React, {Component} from 'react';
import {
  AchievementContainer,
  Circle,
  CircleEmpty,
  CircleLine
} from "./index";

import {
  stageShareList
} from "../store/selectors";
import AchievementModal from "./AchievementModal";


class Achievement extends Component {
  state = {
    isOpenModal: false,
    title: '',
    img: '',
    params: []
  };

  showAchievement = ({title, img, params}) => () => {
    this.setState({
      isOpenModal: true,
      title,
      img,
      params
    })
  };

  handleClose = () => {
    this.setState({
      isOpenModal: false
    })
  };

  render() {
    const {
      isOpenModal,
      title,
      img,
      params
    } = this.state;

    const {
      showedShareStage
    } = this.props;

    const openAchievement = stageShareList.reduce((acc, value, index) => {
      if(!value || value.isNotAchievement) return acc;
      if(showedShareStage >= index) {
        return acc.concat(
          <Circle
            src={value.img}
            onClick={this.showAchievement(value)}
            key={value.title}
            test={true}
          />
        )
      } else {
        return acc.concat(
          <CircleEmpty key={index}/>
        )
      }
    }, []);

    return (
      <AchievementContainer>
        {isOpenModal ? (
          <AchievementModal
            title={title}
            params={params}
            img={img}
            fadeIn={isOpenModal}
            background={'#ffffff'}
            acceptText={'Продолжить'}
            handleClose={this.handleClose}
          />
        ) : null}
        <CircleLine>{openAchievement.slice(0, 4)}</CircleLine>
        <CircleLine>{openAchievement.slice(4)}</CircleLine>
      </AchievementContainer>
    )
  }
}

export default Achievement
