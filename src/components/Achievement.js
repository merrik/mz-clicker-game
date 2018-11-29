import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
  AchievementContainer,
  Circle,
  CircleLine
} from "./index";

import {
  stageShareList
} from "../store/selectors";


@connect((state) => {
  return {
    showedShareStage: state.game.showedShareStage
  }
})
class Achievement extends Component {
  render() {
    const {
      showedShareStage
    } = this.props;

    const openAchievement = stageShareList.reduce((acc, value, index) => {
      if(!value || value.isNotAchievement) return acc;
      if(showedShareStage >= index) {
        return acc.concat(
          <Circle
            key={value.title}
            test={true}
          />
        )
      } else {
        return acc.concat(
          <Circle key={index}/>
        )
      }
    }, []);

    return (
      <AchievementContainer>
        <CircleLine>{openAchievement.slice(0, 4)}</CircleLine>
        <CircleLine>{openAchievement.slice(4)}</CircleLine>
      </AchievementContainer>
    )
  }
}

export default Achievement
