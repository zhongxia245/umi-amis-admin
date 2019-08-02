import React from 'react';
import AmisRenderer from '@/components/AmisRenderer';
import { SchemaNode } from 'amis/lib/types';

export default function() {
  const schema: SchemaNode = {
    type: 'page',
    title: '创建应用',
    body: [
      {
        type: 'form',
        title: '应用基本信息',
        mode: 'horizontal',
        autoFocus: true,
        collapsable: true,
        controls: [
          {
            type: 'fieldSet',
            title: '基本信息',
            collapsable: true,
            controls: [
              { type: 'text', name: 'name', label: '应用名称', required: true },
              { type: 'text', name: 'gruop', label: '开发组', required: true },
              { type: 'text', name: 'service', label: '服务组', required: true },
              { type: 'textarea', name: 'remark', label: '应用介绍' },
            ],
          },
          {
            type: 'fieldSet',
            title: 'API定义',
            collapsable: true,
            controls: [
              {
                type: 'combo',
                name: 'apis',
                label: '接口列表',
                multiple: true,
                inline: true,
                value: [
                  { name: '你好', host: 'https://www.zhongxia.com', api: '/api/user/list' },
                  { name: '你好', host: 'https://www.zhongxia.com', api: '/api/user/list' },
                  { name: '你好', host: 'https://www.zhongxia.com', api: '/api/user/list' },
                ],
                controls: [
                  { name: 'name', type: 'text', placeholder: '接口名称' },
                  { name: 'host', type: 'text', placeholder: '域名' },
                  { name: 'api', type: 'text', placeholder: '接口地址' },
                ],
              },
            ],
          },
          {
            type: 'fieldSet',
            title: '组件配置',
            collapsable: true,
            controls: [
              { type: 'button', inline: true, name: 'name', label: '应用名称' },
              { type: 'button', inline: true, name: 'gruop', label: '开发组' },
              { type: 'button', inline: true, name: 'service', label: '服务组' },
            ],
          },
        ],
      },
    ],
  };
  return <AmisRenderer schema={schema} />;
}
