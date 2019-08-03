import React from 'react';
import AmisRenderer from '@/components/AmisRenderer';
import { SchemaNode } from 'amis/lib/types';

export default function() {
  // 查询条件
  const filter: object = {
    title: '条件搜索',
    submitText: '',
    controls: [
      {
        type: 'select',
        name: 'group',
        label: '用户组',
        size: 'sm',
        options: [
          {
            label: 'All',
            value: 0,
          },
          {
            label: '管理员',
            value: 1,
          },
          {
            label: '开发者',
            value: 2,
          },
        ],
      },
      {
        type: 'text',
        name: 'name',
        label: '名称',
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
      name: 'id',
      label: 'ID',
      width: 20,
      type: 'text',
    },
    {
      name: 'name',
      label: '名称',
      type: 'text',
    },
    {
      name: 'group',
      label: '分组',
      type: 'text',
      align: 'left',
    },
    {
      name: 'status',
      label: '状态',
      type: 'text',
    },
  ];

  // 左侧属性结构
  const asideTree = {
    type: 'form',
    wrapWithPanel: false,
    target: 'window',
    controls: [
      {
        type: 'tree',
        name: 'cat',
        inputClassName: 'no-border',
        submitOnChange: true,
        rootLabel: '用户分组',
        options: [
          {
            label: '超级管理员',
            value: 'cat1',
            children: [
              {
                label: '管理员',
                value: 'cat2',
              },
              {
                label: '开发者',
                value: 'cat3',
              },
            ],
          },
          {
            label: '管理员',
            value: 'cat2',
          },
          {
            label: '开发者',
            value: 'cat3',
          },
          {
            label: '应用成员',
            value: 'cat4',
          },
        ],
      },
    ],
  };

  const schema: SchemaNode = {
    type: 'page',
    title: '用户列表',
    // aside: asideTree,
    toolbar: [
      {
        type: 'button',
        label: '添加用户',
        level: 'primary',
        actionType: 'dialog',
        dialog: {
          title: '添加用户',
          closeOnEsc: true,
          body: {
            type: 'form',
            controls: columns,
          },
        },
      },
    ],
    body: {
      type: 'crud',
      api: '/api/user/list',
      filter: filter,
      itemActions: [
        {
          type: 'button',
          label: '编辑',
          actionType: 'drawer',
          drawer: {
            position: 'left',
            size: 'lg',
            title: '编辑',
            body: {
              type: 'form',
              name: 'sample-edit-form',
              api: 'https://houtai.baidu.com/api/sample/$id',
              controls: columns,
            },
          },
        },
        {
          type: 'button',
          label: '删除',
          actionType: 'ajax',
          confirmText: '您确认要删除?',
          api: 'delete:https://houtai.baidu.com/api/sample/$id',
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
