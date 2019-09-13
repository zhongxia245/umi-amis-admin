import React, { useState } from 'react';

export const AppContext = React.createContext({});

export interface IAppContext {
  global: any;
  action: object;
  [propName: string]: any;
}

export const AppContextProvider = ({ children }: any) => {
  // 修改状态
  const setData = (name: string, data: any) => {
    setState(prevState => {
      return { ...prevState, [name]: data };
    });
  };

  // 添加新的状态
  const addStore = (name: string, initState: any) => {
    setState(prevState => {
      console.log({ ...prevState, [name]: initState });
      return { ...prevState, [name]: initState };
    });
  };

  // 移出子状态
  const removeStore = (key: string) => {
    setState(prevState => {
      delete prevState[key];
      return { ...prevState };
    });
  };

  const initAppState: IAppContext = {
    global: { version: 'v0.0.1' },
    action: {
      setData,
      addStore,
      removeStore,
    },
  };
  const [state, setState] = useState(initAppState);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};
