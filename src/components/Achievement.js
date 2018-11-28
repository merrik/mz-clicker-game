import React, {Component} from 'react';
import {
  AchievementContainer,
  Circle
} from "./index";

import {
  stageShareList
} from "../store/selectors";


class Achievement extends Component {
  render() {
    const {
      showedShareStage
    } = this.props;

    const openAchievement = stageShareList.map((value, index) => {
      if(index === 0) return;
      if(showedShareStage >= index) {
        return (
          <Circle
            key={stageShareList[index].title}
            test={true}
          />
        )
      } else {
        return (
          <Circle/>
        )
      }
    });

    return (
      <AchievementContainer>
        {openAchievement}
      </AchievementContainer>
    )
  }
}

export default Achievement