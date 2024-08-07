import React from 'react';
import { reducer, initialState } from './reducer';

export const VizContext = React.createContext({
  state: initialState,
  dispatch: () => null
});

export const VizProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return <VizContext.Provider value={[state, dispatch]}>{children}</VizContext.Provider>;
};
