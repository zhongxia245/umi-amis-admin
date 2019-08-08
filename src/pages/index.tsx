import React from 'react';
import AmisRenderer from '@/components/AmisRenderer';
import { SchemaNode } from 'amis/lib/types';

export default function() {
  const schema: SchemaNode = {
    type: 'page',
    title: 'Dashboard',
    body: [
      {
        type: 'alert',
        level: 'success',
        body:
          '支持快速通过可视化配置，解决80%的后台需求应用配置可参考 <a href="https://baidu.github.io/amis">《AMIS》</a>。',
      },
      {
        type: 'grid',
        columns: [
          {
            type: 'panel',
            title: '应用组',
            className: 'Panel--primary',
            body: '1个',
            sm: 4,
          },
          {
            type: 'panel',
            title: '应用数量',
            className: 'Panel--info',
            body: '10个',
            sm: 4,
          },
          {
            type: 'panel',
            title: '用户数量',
            className: 'Panel--danger',
            body: '10个',
            sm: 4,
          },
        ],
      },
    ],
  };
  return <AmisRenderer schema={schema} />;
}
