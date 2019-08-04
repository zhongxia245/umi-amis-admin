import React, { Fragment, useState, useEffect } from 'react';
import {
  Form,
  Card,
  Input,
  Row,
  Col,
  Button,
  Table,
  Divider,
  Select,
  Tag,
  message,
  Popconfirm,
  Modal,
} from 'antd';
import { isEmpty } from 'lodash';
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

let apiId = 0;

const Create = ({ form }: { form: any }) => {
  const [state, setState] = useState({
    visibleComponentModal: false,
    currentComponent: {},
    currentComponentIndex: -1,
  });
  const [data, setData]: any = useState({});

  const { getFieldDecorator, getFieldsValue, getFieldValue, setFieldsValue } = form;
  let initData = JSON.parse(localStorage.getItem('app') || '{}');

  let initComponents = getFieldValue('components');
  initComponents = initComponents || initData['components'] || [];
  getFieldDecorator('components', { initialValue: initComponents });

  useEffect(() => {
    let apis: Array<any> = initData.apis || [];
    let _keys = apis.map((item, i) => i);
    initData['_keys_apis'] = _keys;
    setFieldsValue(initData);
  }, []);

  const action = {
    onChange: (name: string, e: any) => {
      let val = e.target ? e.target.value : e;
      setData({ ...data, [name]: val });
    },
    toggleComponentModal: () => {
      setState({
        ...state,
        visibleComponentModal: !state.visibleComponentModal,
        currentComponentIndex: -1,
      });
    },
    saveComponent: (values: object) => {
      let components = getFieldValue('components') || [];
      // 有当前组件标记，则是编辑，否则是新增
      if (state.currentComponentIndex !== -1) {
        components[state.currentComponentIndex] = {
          ...components[state.currentComponentIndex],
          ...values,
        };
      } else {
        components.push({ ...values, key: components.length });
        setFieldsValue({ components });
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
      let components: object[] = getFieldValue('components');
      components.splice(index, 1);
      setFieldsValue({ components });
    },
    addApiItem: () => {
      let apis = getFieldValue('apis') || [];
      apis.push({ id: apiId++ });
      setFieldsValue({ apis });
    },
    // 过滤掉无用的表单数据
    filterData: (data: object) => {
      let newData = JSON.parse(JSON.stringify(data));
      for (const key in newData) {
        if (newData.hasOwnProperty(key)) {
          if (key.startsWith('_')) {
            delete newData[key];
          }
        }
      }

      if (newData.apis) {
        newData.apis = newData.apis.filter((val: any) => !isEmpty(val));
      }

      return newData;
    },
    onSubmit: (e: any) => {
      e.preventDefault();
      form.validateFields((err: any, values: object) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        let data = action.filterData(values);
        localStorage.setItem('app', JSON.stringify(data));
        message.success('创建应用成功~', 100);
      });
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
    // BUG:index.js:1 Warning: [antd: Form.Item] Cannot generate `validateStatus` and `help` automatically, while there are more than one `getFieldDecorator` in it.
    // 这个代码存在这个警告，解决方案就是 一个 FormItem 只放一个 getFieldDecorator
    renderItem: (key: any, item: any = {}) => {
      return (
        <>
          <Col span={6}>
            {getFieldDecorator(`apis[${key}].label`, { initialValue: item.label })(
              <Input placeholder="接口标识：get_list" />,
            )}
          </Col>
          <Col span={6}>
            {getFieldDecorator(`apis[${key}].value`, { initialValue: item.value })(
              <Input placeholder="接口地址：/api/list" />,
            )}
          </Col>
          <Col span={6}>
            {getFieldDecorator(`apis[${key}].remark`, { initialValue: item.remark })(
              <Input placeholder="接口介绍" />,
            )}
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
              value={data.group}
              onChange={action.onChange.bind(null, 'group')}
            >
              <Select.Option value={1}>基本应用组</Select.Option>
            </Select>
          </FormItem>
          <FormItem label="服务组">
            <Select
              placeholder="请选择应用接口所在服务"
              value={data.service}
              onChange={action.onChange.bind(null, 'service')}
            >
              <Select.Option value={1}>基本服务组</Select.Option>
            </Select>
          </FormItem>
          <FormItem label="应用介绍">
            <Input
              placeholder="描述下这个应用有什么用~~"
              value={data.desc}
              onChange={action.onChange.bind(null, 'desc')}
            />
          </FormItem>
        </>
      );
    },
  };

  let formData = getFieldsValue();

  let formdataApis: Array<any> = [];
  if (formData['apis']) {
    formdataApis = formData['apis'].filter((val: object) => val);
  }

  return (
    <Form
      {...formItemLayout}
      style={{ padding: 10, paddingBottom: 50, overflow: 'hidden' }}
      onSubmit={action.onSubmit}
    >
      <Card title="基本信息">{jsx.renderBaseInfo()}</Card>

      <Card
        title="接口信息"
        style={{ marginTop: 10 }}
        extra={
          <Button type="primary" onClick={action.addApiItem}>
            添加接口
          </Button>
        }
      >
        <DynamicFieldSet
          label="接口列表"
          btnLabel="添加接口"
          name="apis"
          form={form}
          initialValue={initData.apis && initData.apis.filter((val: any) => val)}
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
          dataSource={formData['components']}
        />
        {state.visibleComponentModal && (
          <ModalComponentConfig
            visible={true}
            apis={formdataApis}
            initialValue={state.currentComponent}
            onCancel={action.toggleComponentModal}
            onOk={action.saveComponent}
          />
        )}
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

export default Form.create({ name: 'create_app' })(Create);
