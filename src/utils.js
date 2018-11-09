export const nextCost = ({base, rate, owned}) => base * (rate ** owned)
export const production = ({production, owned, multipliers}) => production * owned * multipliers
export const expired = actualTimestamp => el => el.timestamp <= actualTimestamp
export const notExpired = actualTimestamp => el => el.timestamp > actualTimestamp
export const reduceQTY = (x, y) => x + y.qty
export const reduceBalance = (x, y) => x + y.balance

export const loadState = (key) => {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
};

export const saveState = (key, state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch {
      // ignore write errors
    }
  };