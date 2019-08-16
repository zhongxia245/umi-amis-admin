import React from 'react';
import { Tag } from 'antd';
import COMP_CONFIG from './config';

export default (config: IComp) => {
  const { ctype, ...otherProps } = config;
  if (COMP_CONFIG[ctype]) {
    return COMP_CONFIG[ctype](otherProps);
  } else {
    return <Tag color="purple">暂不支持该组件类型：{ctype}</Tag>;
  }
};
