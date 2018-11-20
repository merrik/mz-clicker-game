import React from 'react';
import styled from "styled-components";
import { addSecretary } from '../store/actions';
import * as U from '../utils';

const Label = styled.p`
    margin: 0;
    margin-bottom: 3px;
    font-size: 12px;
`;

const AddButton = styled.button`
    /* border: 1px solid blue; */
`;

const Court = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Labels = styled.div`
  background-color: white;
  color: black;
`;

export default ({
    name,
    materials,
    productionJailed,
    productionBalance,
    upgradeCost,
    onClick
}) => (
    <Court>
        <Labels>
            <Label>Имя&nbsp;<strong>{name}</strong></Label>
            <Label>Стоимость&nbsp;<strong>{materials}</strong></Label>
            <Label>Скорость посадки&nbsp;<strong>{productionJailed}</strong></Label>
            <Label>Инкам бюджета&nbsp;<strong>{productionBalance}</strong></Label>
            <Label>Стоимость апргрейда&nbsp;<strong>{U.fixed(upgradeCost)}</strong></Label>
            <Label><strong></strong></Label>
        </Labels>
        <AddButton
            onClick={onClick}>
            Добавить судью
        </AddButton>
    </Court>
)