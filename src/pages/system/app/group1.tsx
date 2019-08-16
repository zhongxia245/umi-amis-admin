import React from 'react';
import AmisRenderer from '@/components/AmisRenderer';
import { SchemaNode } from 'amis/lib/types';

export default function() {
  const filter: object = {
    title: '条件搜索',
    submitText: '',
    controls: [
      {
        type: 'text',
        name: 'name',
        label: '分组名称',
        placeholder: '模糊匹配名称',
        addOn: {
          label: '搜索',
          type: 'submit',
        },
      },
    ],
  };

  // 表格字段
  const columns: Array<any> = [
    {
      name: '_id',
      label: 'ID',
      width: 250,
      type: 'text',
    },
    {
      name: 'name',
      label: '分组名称',
      type: 'text',
    },
    {
      name: 'remark',
      label: '描述',
      type: 'text',
      align: 'left',
    },
    {
      name: 'status',
      label: '状态',
      type: 'switch',
      value: true,
    },
  ];

  const schema: SchemaNode = {
    type: 'page',
    title: '分组列表',
    subTitle: '应用的分组信息，每个应用一定会属于某个分组',
    toolbar: [
      {
        type: 'button',
        label: '添加分组',
        level: 'primary',
        actionType: 'dialog',
        dialog: {
          title: '添加分组',
          closeOnEsc: true,
          body: {
            type: 'form',
            api: 'post:/api/v1/group',
            controls: columns.slice(1, columns.length),
          },
        },
      },
    ],
    body: {
      type: 'crud',
      api: '/api/v1/group',
      filter: filter,
      itemActions: [
        {
          type: 'button',
          label: '编辑',
          actionType: 'dialog',
          dialog: {
            title: '编辑',
            body: {
              type: 'form',
              name: 'sample-edit-form',
              api: 'post:/api/v1/group/$_id',
              controls: columns,
            },
          },
        },
        {
          type: 'button',
          label: '删除',
          actionType: 'ajax',
          confirmText: '您确认要删除?',
          api: 'delete:/api/v1/group/$_id',
        },
      ],
      bulkActions: [
        {
          label: '批量删除',
          actionType: 'ajax',
          api: 'delete:https://houtai.baidu.com/api/sample/${ids|raw}',
          confirmText: '确定要批量删除?',
          type: 'button',
        },
      ],
      columns: columns,
    },
  };
  return <AmisRenderer schema={schema} />;
}
