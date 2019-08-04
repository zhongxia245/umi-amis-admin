import React from 'react';
import AmisRenderer from '@/components/AmisRenderer';
import { SchemaNode } from 'amis/lib/types';

export default function() {
  const columns: Array<any> = [
    {
      name: 'id',
      label: 'ID',
      width: 20,
      type: 'text',
    },
    {
      name: 'name',
      label: '应用名称',
      type: 'text',
    },
    {
      name: 'group_id',
      label: '开发组',
      type: 'text',
    },
    {
      name: 'service_id',
      label: '开发组',
      type: 'text',
    },
    {
      name: 'remark',
      label: '简介',
      type: 'text',
    },
    {
      name: 'status',
      label: '状态',
      type: 'text',
    },
  ];

  const filter: object = {
    title: '条件搜索',
    submitText: '',
    controls: [
      {
        type: 'text',
        name: 'name',
        label: '应用名称',
        placeholder: '支持模糊匹配',
        addOn: {
          label: '搜索',
          type: 'submit',
        },
      },
    ],
  };

  const schema: SchemaNode = {
    type: 'page',
    title: '应用列表',
    toolbar: [
      {
        type: 'button',
        label: '添加应用',
        level: 'primary',
        actionType: 'link',
        link: '/system/app/create',
      },
    ],
    body: {
      type: 'crud',
      api: '/api/v1/app',
      headerToolbar: null,
      footerToolbar: ['statistics', 'switch-per-page', 'pagination'],
      filter: filter, // 这里面是一个 form组件
      columns: columns,
      itemActions: [
        {
          type: 'button',
          label: '编辑',
          actionType: 'drawer',
          drawer: {
            closeOnEsc: true,
            position: 'right',
            size: 'lg',
            title: '编辑',
            body: {
              type: 'form',
              name: 'sample-edit-form',
              api: 'post:/api/app/$id',
              controls: columns,
            },
          },
        },
        {
          type: 'button',
          label: '删除',
          actionType: 'ajax',
          confirmText: '您确认要删除?',
          api: 'delete:/api/app/$id',
        },
      ],
    },
  };
  return <AmisRenderer schema={schema} />;
}
