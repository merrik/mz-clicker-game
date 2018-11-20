import * as C from '../constants'

export const calculate = ({timestamp}) => ({
  type: C.CALCULATE,
  timestamp: timestamp
});

export const addMaterial = (timestamp) => ({
  type: C.ADD_MATERIAL,
  timestamp: timestamp,
  target: C.MATERIALS,
  qty: 1
});

export const removeMaterials = ({timestamp, qty}) => ({
  type: C.ADD_MATERIAL,
  timestamp: timestamp,
  target: C.MATERIALS,
  qty: -1 * qty
});

export const addCourt = (cost) => ({
  type: C.ADD_COURT,
  cost: cost
});

export const updateCourt = ({index, cost}) => ({
  type: C.UPDATE_COURT,
  courtIndex: index,
  cost: cost
});

export const addInformer = (cost) => ({
  type: C.ADD_INFORMER,
  cost: cost
});

export const addInformator = ({index, cost}) => ({
  type: C.ADD_INFORMATOR,
  index: index,
  cost: cost
});

export const addSecretary = ({index, cost}) => ({
  type: C.ADD_SECRETARY,
  index: index,
  cost: cost
});
