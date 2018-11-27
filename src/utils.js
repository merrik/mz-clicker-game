export const nextCost = ({base, rate, owned}) => base * (rate ** owned)
export const production = ({production, owned, multipliers}) => production * owned * multipliers
export const expired = actualTimestamp => el => el.timestamp <= actualTimestamp
export const notExpired = actualTimestamp => el => el.timestamp > actualTimestamp
export const reduceQTY = (x, y) => x + y.qty
export const reduceBalance = (x, y) => x + y.balance
export const fixed = x => typeof x === 'number' ? x.toFixed(2) : parseFloat(x).toFixed(2)
export const makeFormatM = num => {
  function intlFormat(num)
  {
    return new Intl.NumberFormat().format(Math.round(num*10)/10);
  }
  if(num >= 10**18)
    return intlFormat(num/10**18)+' квид';
  if(num >= 10**15)
    return intlFormat(num/10**15)+' квдр';
  if(num >= 10**12)
    return intlFormat(num/10**12)+' трлн';
  if(num >= 10**9)
    return intlFormat(num/10**9)+' млрд';
  if(num >= 10**6)
    return intlFormat(num/10**6)+' млн';
  if(num >= 1000)
    return intlFormat(num/1000)+' тыс';
  return intlFormat(num);
};

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