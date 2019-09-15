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
        label: '服务名称',
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
      type: 'text',
      name: '_id',
      label: 'ID',
      width: 250,
      disabled: true,
    },
    {
      type: 'text',
      name: 'name',
      label: '服务名称',
    },
    {
      type: 'text',
      name: 'protocol',
      label: '协议',
    },
    {
      type: 'text',
      name: 'host',
      label: '域名',
    },
    {
      type: 'text',
      name: 'port',
      label: '端口',
    },
    {
      type: 'text',
      name: 'token',
      label: 'token',
      align: 'left',
    },
    {
      type: 'switch',
      name: 'status',
      label: '状态',
      value: true,
    },
  ];

  const schema: SchemaNode = {
    type: 'page',
    title: '服务列表',
    subTitle: '应用的接口服务信息，中间层会根据该服务信息，对接口进行代理',
    toolbar: [
      {
        type: 'button',
        label: '添加服务',
        level: 'primary',
        actionType: 'dialog',
        dialog: {
          title: '添加服务',
          closeOnEsc: true,
          body: {
            type: 'form',
            api: 'post:https://api.izhongxia.com/api/v1/service',
            controls: columns.slice(1, columns.length),
          },
        },
      },
    ],
    body: {
      type: 'crud',
      api: 'https://api.izhongxia.com/api/v1/service',
      filter: filter,
      bulkActions: [
        {
          label: '批量删除',
          actionType: 'ajax',
          api: 'delete:https://houtai.baidu.com/api/sample/${ids|raw}',
          confirmText: '确定要批量删除?',
          type: 'button',
        },
      ],
      columns: [
        ...columns,
        {
          type: 'operation',
          label: '操作',
          width: 100,
          buttons: [
            {
              type: 'button',
              level: 'primary',
              label: '编辑',
              actionType: 'dialog',
              dialog: {
                title: '编辑',
                body: {
                  type: 'form',
                  name: 'sample-edit-form',
                  api: 'post:https://api.izhongxia.com/api/v1/service/$_id',
                  controls: columns,
                },
              },
            },
            {
              type: 'button',
              level: 'danger',
              label: '删除',
              actionType: 'ajax',
              confirmText: '您确认要删除?',
              api: 'delete:https://api.izhongxia.com/api/v1/service/$_id',
            },
          ],
        },
      ],
    },
  };
  return <AmisRenderer schema={schema} />;
}
