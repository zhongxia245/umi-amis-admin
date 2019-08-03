import React from 'react';
import AmisRenderer from '@/components/AmisRenderer';
import { SchemaNode } from 'amis/lib/types';

export default function() {
  const schema: SchemaNode = {
    type: 'page',
    title: '新建用户',
    body: {
      type: 'alert',
      level: 'success',
      body: '使用文档参考：<a href="https://baidu.github.io/amis">《AMIS》</a>,',
    },
  };
  return <AmisRenderer schema={schema} />;
}
