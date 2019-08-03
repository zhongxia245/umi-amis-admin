import React, { Fragment } from 'react';
import { Form, Card, Input, Col, Button, Table, Divider, Select, Tag } from 'antd';
import DynamicFieldSet from './components/DynamicFieldSet';

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

const dataScource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

const Create = ({ form }: { form: any }) => {
  const { getFieldDecorator, getFieldsValue } = form;

  const config = {
    columns: [
      {
        title: '组件名称',
        dataIndex: 'name',
      },
      {
        title: '主体应用',
        dataIndex: 'age',
        render: (text: string) => <Tag color="purple">{text}</Tag>,
      },
      {
        title: '组件描述',
        dataIndex: 'address',
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: () => (
          <Fragment>
            <a href="javascript:;">编辑</a>
            <Divider type="vertical" />
            <a href="javascript:;">删除</a>
          </Fragment>
        ),
      },
    ],
  };

  const jsx = {
    renderItem: (key: any) => {
      return (
        <Fragment>
          <Col span={6}>
            {getFieldDecorator(`apis.${key}.name`)(<Input placeholder="接口标识：get_list" />)}
          </Col>
          <Col span={6}>
            {getFieldDecorator(`apis.${key}.group`)(<Input placeholder="接口地址：/api/list" />)}
          </Col>
          <Col span={6}>
            {getFieldDecorator(`apis.${key}.service`)(<Input placeholder="接口介绍" />)}
          </Col>
        </Fragment>
      );
    },
  };

  console.log(getFieldsValue());

  return (
    <Form {...formItemLayout} style={{ padding: 10 }}>
      <Card title="基本信息">
        <FormItem label="应用名称">
          {getFieldDecorator('name')(<Input placeholder="应用的名称" />)}
        </FormItem>
        <FormItem label="应用组">
          {getFieldDecorator('group')(
            <Select showSearch={true} placeholder="请选择应用所属组">
              <Select.Option value={1}>基本应用组</Select.Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label="服务组">
          {getFieldDecorator('service')(
            <Select showSearch={true} placeholder="请选择应用接口所在服务">
              <Select.Option value={1}>基本服务组</Select.Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label="应用介绍">
          {getFieldDecorator('desc')(<Input placeholder="描述下这个应用有什么用~~" />)}
        </FormItem>
      </Card>

      <Card title="接口信息" style={{ marginTop: 10 }}>
        <DynamicFieldSet
          label="接口列表"
          btnLabel="添加接口"
          name="apis"
          form={form}
          renderItem={jsx.renderItem}
        />
      </Card>

      <Card
        title="组件配置"
        style={{ marginTop: 10 }}
        extra={<Button type="primary">添加应用</Button>}
      >
        <Table
          size="small"
          bordered={true}
          pagination={false}
          columns={config.columns}
          dataSource={dataScource}
        />
      </Card>
    </Form>
  );
};

export default Form.create({ name: 'create_app' })(Create);
