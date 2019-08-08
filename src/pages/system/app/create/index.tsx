import React, { Fragment, useState, useEffect } from 'react';
import router from 'umi/router';
import queryString from 'query-string';
import { set, cloneDeep } from 'lodash';
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
import { getAppById, getGroup, getService, createOrUpdateApp } from '@/api';
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

const Create = () => {
  // 页面状态
  const [state, setState] = useState({
    _id: '',
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
    const params = queryString.parse(window.location.search);
    const id: any = params.id;
    if (id) {
      const getAppData = async () => {
        let data: any = await getAppById(id);
        if (data._id) {
          let appConfig = JSON.parse(data.config);
          setData(appConfig);
          setState({ ...state, _id: data._id });
        }
      };
      getAppData();
    }

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
      let modules = data['modules'] || [];
      // 有当前组件标记，则是编辑，否则是新增
      if (state.currentComponentIndex !== -1) {
        modules[state.currentComponentIndex] = {
          ...modules[state.currentComponentIndex],
          ...values,
        };
      } else {
        modules.push({ ...values, key: modules.length });
        setData({ ...data, modules });
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
      let modules: object[] = data.modules || [];
      modules.splice(index, 1);
      setData({ ...data, modules });
    },
    onSubmit: async (e: any) => {
      e.preventDefault();
      let newData = cloneDeep(data);

      newData.body = newData.modules.filter((item: any) => item.layout === '');

      let apiData: IAppConfig = {
        name: newData.name,
        group_id: newData.group_id,
        service_id: newData.service_id,
        remark: newData.remark,
        config: JSON.stringify(newData),
        version: 1,
      };
      // 存在 id 则是编辑
      if (state._id) {
        apiData._id = state._id;
      }
      await createOrUpdateApp(apiData);
      message.success('创建应用成功~', 1, () => {
        router.push('/system/app/list');
      });
    },
  };

  const config = {
    columns: [
      {
        title: '模块标题',
        dataIndex: 'title',
      },
      {
        title: '模块标识',
        dataIndex: 'name',
      },
      {
        title: '模块布局',
        dataIndex: 'layout',
        render: (text: string) => <Tag color="purple">{String(text) || '默认布局'}</Tag>,
      },
      {
        title: '模块类型',
        dataIndex: 'type',
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
              placeholder="随意接口标识 => get_list"
              value={item['label']}
              onChange={action.onChange.bind(null, `${name}[${key}].label`)}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder="[method]:path => get:/api/list"
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
          <FormItem label="应用标题" required={true}>
            <Input
              placeholder="请输入应用的标题"
              value={data.title}
              onChange={action.onChange.bind(null, 'title')}
            />
          </FormItem>
          <FormItem label="应用介绍" required={true}>
            <Input
              placeholder="描述下这个应用有什么用~~"
              value={data.subTitle}
              onChange={action.onChange.bind(null, 'subTitle')}
            />
          </FormItem>
          <FormItem label="应用组" required={true}>
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
          <FormItem label="服务组" required={true}>
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

      <Card title="接口列表" style={{ marginTop: 10 }}>
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
        title="模块配置"
        style={{ marginTop: 10 }}
        extra={
          <Button type="primary" onClick={action.toggleComponentModal}>
            添加模块
          </Button>
        }
      >
        <Table
          size="small"
          bordered={true}
          pagination={false}
          columns={config.columns}
          dataSource={data['modules']}
        />
        {state.visibleComponentModal && (
          <ModalComponentConfig
            visible={state.visibleComponentModal}
            apis={data['apis']}
            modules={data['modules']}
            initData={state.currentComponent}
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

export default Create;
