import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as S from '../store/selectors'

import Column from './Column';
import Title from './Header';
import Counter from './Counter';

const mapStateToProps = (state) => {
    const { game } = state;
    return {
      materials: S.materials(state),
      jailed: Math.floor(game.jailed),
      balance: S.balance(state)
    };
  };

class Statistics extends Component {
    render() {
        return (
          <Column>
            <Title>Статистика</Title>
            {this.props.materials >= 0 && <Counter header='Материалы дела' count={this.props.materials} />}
            {this.props.jailed >= 0 && <Counter header='Посажено' count={this.props.jailed} />}
            {this.props.balance >= 0 && <Counter header='Бюджет' count={this.props.balance} />}
          </Column>
        )
    }
}

export default connect(mapStateToProps)(Statistics)