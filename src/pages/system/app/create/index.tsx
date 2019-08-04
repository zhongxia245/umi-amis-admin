import React, { Fragment, useState, useEffect } from 'react';
import router from 'umi/router';
import {
  Form,
  Card,
  Input,
  Col,
  Button,
  Table,
  Divider,
  Select,
  Tag,
  message,
  Popconfirm,
} from 'antd';
import { set, cloneDeep } from 'lodash';
import { getGroup, getService, createOrUpdateApp } from '@/api';
import DynamicFieldSet from './components/DynamicFieldSet';
import ModalComponentConfig from './components/ModalComponentConfig';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

let initData: any = {};

const Create = () => {
  // 页面状态
  const [state, setState] = useState({
    visibleComponentModal: false,
    currentComponent: {},
    currentComponentIndex: -1,
  });
  // 下拉列表选项
  const [list, setList] = useState({
    group: [],
    service: [],
  });
  // 表单数据
  const [data, setData]: any = useState({});

  useEffect(() => {
    initData = JSON.parse(localStorage.getItem('app') || '{}');
    setData(initData);

    const getData = async () => {
      let [group, service]: any = await Promise.all([getGroup(), getService()]);
      setList({ group, service });
    };

    getData();
  }, []);

  const action = {
    // 设置状态， name 支持  a.b.c / 0.label => 参考 lodash set
    onChange: (name: string, e: any) => {
      let val = e.target ? e.target.value : e;
      let newData = cloneDeep(data);
      set(newData, name, val);
      setData(newData);
    },
    toggleComponentModal: () => {
      setState({
        ...state,
        visibleComponentModal: !state.visibleComponentModal,
        currentComponentIndex: -1,
        currentComponent: {},
      });
    },
    saveComponent: (values: object) => {
      let components = data['components'] || [];
      // 有当前组件标记，则是编辑，否则是新增
      if (state.currentComponentIndex !== -1) {
        components[state.currentComponentIndex] = {
          ...components[state.currentComponentIndex],
          ...values,
        };
      } else {
        components.push({ ...values, key: components.length });
        setData({ ...data, components });
      }
      action.toggleComponentModal();
    },
    editComponent: (record: any, index: any) => {
      setState({
        ...state,
        currentComponent: record,
        currentComponentIndex: index,
        visibleComponentModal: true,
      });
    },
    deleteComponent: (index: number) => {
      let components: object[] = data.components || [];
      components.splice(index, 1);
      setData({ ...data, components });
    },
    onSubmit: async (e: any) => {
      e.preventDefault();
      let newData = cloneDeep(data);
      let apiData: IAppConfig = {
        name: newData.name,
        group_id: newData.group_id,
        service_id: newData.service_id,
        remark: newData.remark,
        config: JSON.stringify(newData),
        version: 1,
      };
      await createOrUpdateApp(apiData);
      message.success('创建应用成功~', 100);
      router.push('/system/app/list');
    },
  };

  const config = {
    columns: [
      {
        title: '组件名称',
        dataIndex: 'name',
      },
      {
        title: '组件类型',
        dataIndex: 'type',
      },
      {
        title: '主体应用',
        dataIndex: 'main',
        render: (text: string) => <Tag color="purple">{String(text)}</Tag>,
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (text: any, record: any, index: number) => (
          <Fragment>
            <a
              href="javascript:;"
              onClick={() => {
                action.editComponent(record, index);
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <Popconfirm
              title="是否删除该组件？"
              onConfirm={() => {
                action.deleteComponent(index);
              }}
            >
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </Fragment>
        ),
      },
    ],
  };

  const jsx = {
    renderItem: ({ key, name, item = {} }: any) => {
      return (
        <>
          <Col span={6}>
            <Input
              placeholder="接口标识：get_list"
              value={item['label']}
              onChange={action.onChange.bind(null, `${name}[${key}].label`)}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder="接口地址：/api/list"
              value={item['value']}
              onChange={action.onChange.bind(null, `${name}[${key}].value`)}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder="接口介绍"
              value={item['remark']}
              onChange={action.onChange.bind(null, `${name}[${key}].remark`)}
            />
          </Col>
        </>
      );
    },
    renderBaseInfo: () => {
      return (
        <>
          <FormItem label="应用名称">
            <Input
              placeholder="应用的名称"
              value={data.name}
              onChange={action.onChange.bind(null, 'name')}
            />
          </FormItem>
          <FormItem label="应用组">
            <Select
              placeholder="请选择应用所属组"
              value={data.group_id}
              onChange={action.onChange.bind(null, 'group_id')}
            >
              {list.group.map((item: any) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="服务组">
            <Select
              placeholder="请选择应用接口所在服务"
              value={data.service_id}
              onChange={action.onChange.bind(null, 'service_id')}
            >
              {list.service.map((item: any) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="应用介绍">
            <Input
              placeholder="描述下这个应用有什么用~~"
              value={data.remark}
              onChange={action.onChange.bind(null, 'remark')}
            />
          </FormItem>
        </>
      );
    },
  };

  return (
    <Form
      {...formItemLayout}
      style={{ padding: 10, paddingBottom: 50, overflow: 'hidden' }}
      onSubmit={action.onSubmit}
    >
      <Card title="基本信息">{jsx.renderBaseInfo()}</Card>

      <Card title="接口信息" style={{ marginTop: 10 }}>
        <DynamicFieldSet
          name="apis"
          label="接口列表"
          btnLabel="添加接口"
          setData={setData}
          data={data}
          renderItem={jsx.renderItem}
        />
      </Card>

      <Card
        title="组件配置"
        style={{ marginTop: 10 }}
        extra={
          <Button type="primary" onClick={action.toggleComponentModal}>
            添加应用
          </Button>
        }
      >
        <Table
          size="small"
          bordered={true}
          pagination={false}
          columns={config.columns}
          dataSource={data['components']}
        />
        <ModalComponentConfig
          visible={state.visibleComponentModal}
          apis={data['apis']}
          initData={state.currentComponent}
          onCancel={action.toggleComponentModal}
          onOk={action.saveComponent}
        />
      </Card>

      <Button
        size="large"
        type="primary"
        htmlType="submit"
        style={{ display: 'block', width: 300, margin: '40px auto' }}
      >
        保存应用
      </Button>
    </Form>
  );
};

export default Create;
