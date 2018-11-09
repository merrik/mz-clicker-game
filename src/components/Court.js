import React from 'react';
import styled from "styled-components";
import { addSecretary } from '../store/actions';

const Label = styled.p`
    margin: 0;
    margin-bottom: 3px;
    font-size: 12px;
`
const AddButton = styled.button`
    /* border: 1px solid blue; */
`;

const Court = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  /* background-color: ${ props => props.active ? 'white' : 'gray' }; */
  /* color: ${ props => props.active ? 'black' : 'gray' }; */
  /* justify-content: center;
  align-content: flex-start;
  align-items: flex-start; */
  /* border: 1px solid red; */

`;

const Labels = styled.div`
  background-color: white;
  color: black;
`
export default ({
    cost,
    time,
    result,
    onClick,
    active,
    addJudge,
    judges,
    freeJudges,
    nextJudgeCost,
    enoughMaterials,
    enoughBudget,
    balance,
    addSecretary,
    secretaryCost,
    enoughToSecretary,
    haveSecretary
}) => (
    <Court active={active}>
        <Labels>
            <Label>Для возбуждения:<br/><strong>{cost} материалов</strong></Label>
            <Label>Время рассмотрения:<br/><strong>{time} сек</strong></Label>
            <Label>Бдует посажено:<br/><strong>{result} человек</strong></Label>
            <Label>Будет заработано:<br/><strong>{balance}$</strong></Label>
            <Label>Всего судей:<br/><strong>{judges} человек</strong></Label>
            <Label>Доступно судей:<br/><strong>{freeJudges} человек</strong></Label>
            { haveSecretary && <Label><strong>В этом суде есть секретарь</strong></Label>}
        </Labels>
        <AddButton
            disabled={!enoughMaterials || freeJudges <= 0}
            onClick={onClick}>
            Передать материалы
        </AddButton>
        <AddButton
            disabled={!enoughBudget}
            onClick={addJudge}>
            Добавить судью ({nextJudgeCost}$)
        </AddButton>
        { !haveSecretary && <AddButton
                disabled={!enoughToSecretary}
                onClick={addSecretary}>
                Добавить секретаря ({secretaryCost}$)
            </AddButton>
        }
    </Court>
)