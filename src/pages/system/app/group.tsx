import React from 'react';
import AmisRenderer from '@/components/AmisRenderer';
import { SchemaNode } from 'amis/lib/types';

export default function() {
  const schema: SchemaNode = {
    type: 'page',
    title: '应用分组',
    body: {
      type: 'alert',
      level: 'success',
      body:
        '支持快速通过可视化配置，解决80%的后台需求应用配置可参考 <a href="https://baidu.github.io/amis">《AMIS》</a>。',
    },
  };
  return <AmisRenderer schema={schema} />;
}
