import React, { useEffect, useState } from 'react';
import AmisRenderer from '@/components/AmisRenderer';
import { SchemaNode } from 'amis/lib/types';

export default function() {
  const [data, setData]: Array<any> = useState({});

  let onInit = (initData: object) => {
    let cacheData = JSON.parse(localStorage.getItem('/api/app/create') || '{}');
    setData(cacheData);
    console.log('[init]', cacheData);
  };

  // api 配置
  const apiConfig: object = {
    type: 'combo',
    name: 'apis',
    multiple: true,
    inline: true,
    value: [
      {
        label: 'get_user',
        value: '/api/user/list',
        remark: '用户列表',
      },
    ],
    controls: [
      {
        type: 'text',
        name: 'label',
        placeholder: '接口标识',
        remark: '接口标识在当前应用中需要唯一',
      },
      { type: 'text', name: 'value', placeholder: '接口地址：/api/list' },
      { type: 'text', name: 'remark', placeholder: '接口描述' },
    ],
  };

  // 内部组件，表格配置
  const innerCompTable: Array<any> = [
    {
      type: 'combo',
      name: 'filter.controls',
      label: '表格搜索',
      multiple: true,
      inline: true,
      hiddenOn: 'data.type != "crud"',
      controls: [
        { name: 'label', type: 'text', placeholder: 'label' },
        { name: 'name', type: 'text', placeholder: 'name' },
        {
          name: 'type',
          type: 'text',
          value: 'text',
          placeholder: '展示类型',
          remark: '单元格的展示类型',
        },
      ],
    },
    {
      type: 'combo',
      name: 'columns',
      label: '表格字段',
      multiple: true,
      inline: true,
      controls: [
        { name: 'label', type: 'text', placeholder: 'label', required: true },
        { name: 'name', type: 'text', placeholder: 'name', required: true },
        {
          name: 'type',
          type: 'text',
          value: 'text',
          placeholder: '展示类型',
          remark: '单元格的展示类型',
          required: true,
        },
      ],
    },
  ];

  const innerCompForm: Array<any> = [
    {
      type: 'combo',
      name: 'controls',
      label: '表单项配置',
      multiple: true,
      inline: true,
      hiddenOn: 'data.type != "form"',
      controls: [
        { name: 'label', type: 'text', placeholder: 'label' },
        { name: 'name', type: 'text', placeholder: 'name' },
        { name: 'type', type: 'text', placeholder: '展示类型', remark: '单元格的展示类型' },
      ],
    },
  ];

  // 内部组件
  const innerComp: object = [
    {
      type: 'text',
      name: 'title',
      label: '组件名称',
      value: '',
    },
    {
      type: 'switch',
      name: 'main',
      label: '主体组件',
      inline: true,
      remark: '主体组件：应用（页面）的主体部分，即刚打开页面时看到的组件',
    },
    {
      type: 'radios',
      name: 'type',
      label: '组件类型',
      inline: true,
      value: 'crud',
      options: [
        {
          label: '表格组件',
          value: 'crud',
        },
        {
          label: '表单组件',
          value: 'form',
        },
      ],
    },
    {
      type: 'select',
      name: 'api',
      label: '接口地址',
      searchable: true,
      size: 'lg',
      source: '$apis',
    },
    {
      type: 'fieldset',
      title: 'Table表格配置',
      collapsable: true,
      hiddenOn: 'data.type != "crud"',
      controls: innerCompTable,
    },
    {
      type: 'fieldset',
      title: 'Form表单配置',
      collapsable: true,
      hiddenOn: 'data.type != "form"',
      controls: innerCompForm,
    },
  ];

  // 自定义组件
  const customComp: object = [
    { type: 'text', name: 'title', label: '组件名称' },
    {
      type: 'select',
      name: 'type',
      label: '选择定制组件',
      options: [{ label: '知识库', value: 'knowledge' }],
    },
    {
      type: 'select',
      name: 'api',
      label: '接口地址',
      size: 'lg',
      source: '$apis',
    },
    { type: 'switch', name: 'enable', label: '是否启用' },
  ];

  // 页面配置
  const schema: SchemaNode = {
    $schema: 'https://houtai.baidu.com/v2/schemas/page.json',
    type: 'page',
    title: '创建应用',
    body: [
      {
        type: 'form',
        title: '',
        api: '/api/app/create',
        mode: 'horizontal',
        autoFocus: true,
        collapsable: true,
        onInit: onInit,
        source: data,
        controls: [
          {
            type: 'fieldSet',
            title: '基本信息',
            collapsable: true,
            controls: [
              {
                type: 'text',
                name: 'name',
                label: '应用名称',
                value: data['name'],
                required: true,
              },
              {
                type: 'select',
                name: 'gruop',
                label: '应用组',
                value: 1,
                required: true,
                options: [{ label: '基础应用组', value: 1 }],
              },
              {
                type: 'select',
                name: 'service',
                label: '服务组',
                value: 1,
                required: true,
                options: [{ label: '基础服务组', value: 1 }],
              },
              {
                type: 'textarea',
                name: 'remark',
                label: '应用介绍',
                placeholder: '写一些应用的介绍吧...',
              },
            ],
          },
          {
            type: 'fieldSet',
            title: 'API定义',
            collapsable: true,
            controls: [apiConfig],
          },
          {
            type: 'fieldSet',
            title: '组件配置',
            collapsable: true,
            controls: [
              {
                type: 'form',
                label: '内部组件列表',
                name: 'components',
                labelField: 'title',
                btnLabel: '点击设置',
                multiple: true,
                form: {
                  size: 'lg',
                  title: '新增内部组件',
                  controls: innerComp,
                },
              },
              {
                type: 'form',
                label: '自定义组件列表',
                name: 'custom_components',
                labelField: 'title',
                btnLabel: '点击设置',
                multiple: true,
                form: {
                  size: 'lg',
                  title: '新增自定义组件',
                  controls: customComp,
                },
              },
            ],
          },
        ],
      },
    ],
  };

  return <AmisRenderer schema={schema} />;
}
