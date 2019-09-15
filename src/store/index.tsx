import React, { useState } from 'react';

interface IAppContext {
  global: any;
  action: object;
  [propName: string]: any;
}

interface IAppProps {
  children: any;
  initState: any;
}

export const AppContext = React.createContext({});

export const AppContextProvider = ({ children, initState }: IAppProps) => {
  // 修改状态
  const setData = (name: string, data: any) => {
    setState(prevState => {
      return { ...prevState, [name]: data };
    });
  };

  const initAppState: IAppContext = {
    global: { version: 'v0.0.1' },
    action: { setData },
    ...initState,
  };
  const [state, setState] = useState(initAppState);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};
