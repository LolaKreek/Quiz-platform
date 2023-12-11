export const isEqualState = ({state, state2}: any) => {
    if (typeof state !== 'object' || typeof state2 !== 'object') return false
    return Object.keys(state).every(k => state[k] === state2[k])
  }