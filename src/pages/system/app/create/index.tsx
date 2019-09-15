import React, { Fragment, useState, useEffect, useContext } from 'react';
import router from 'umi/router';
import queryString from 'query-string';
import { set, cloneDeep } from 'lodash';
import {
  Form,
  Card,
  Input,
  Button,
  Table,
  Divider,
  Select,
  Tag,
  message,
  Popconfirm,
  Col,
} from 'antd';
import { getAppById, getGroup, getService, createOrUpdateApp } from '@/api';
import { AppContext } from '@/store';
import DynamicFieldSet from '@/components/DynamicFieldSet';

import ModalComponentConfig from './components/ModalComponentConfig';
import ModalApiConfig from './components/ModalApiConfig';

const FormItem = Form.Item;
const Option = Select.Option;

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
    // module弹窗
    visibleModuleModal: false,
    currentModule: {},
    currentModuleIndex: -1,
    // api弹窗
    visibleApiModal: false,
    currentApi: {},
    currentApiIndex: -1,
  });
  // 下拉列表选项
  const [list, setList] = useState({
    group: [],
    service: [],
  });
  // 表单数据
  const [data, setData]: any = useState({});

  const { refreshMenus }: any = useContext(AppContext);

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
        visibleModuleModal: !state.visibleModuleModal,
        currentModuleIndex: -1,
        currentModule: {},
      });
    },
    saveComponent: (values: object) => {
      let modules = data['modules'] || [];
      // 有当前组件标记，则是编辑，否则是新增
      if (state.currentModuleIndex !== -1) {
        modules[state.currentModuleIndex] = {
          ...modules[state.currentModuleIndex],
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
        currentModule: record,
        currentModuleIndex: index,
        visibleModuleModal: true,
      });
    },
    deleteComponent: (index: number) => {
      let modules: object[] = data.modules || [];
      modules.splice(index, 1);
      setData({ ...data, modules });
    },
    toggleApiModal: () => {
      setState({
        ...state,
        visibleApiModal: !state.visibleApiModal,
      });
    },
    saveApi: (values: object) => {
      let apis = data['apis'] || [];
      // 有当前组件标记，则是编辑，否则是新增
      if (state.currentApiIndex !== -1) {
        apis[state.currentApiIndex] = {
          ...apis[state.currentApiIndex],
          ...values,
        };
      } else {
        apis.push({ ...values, key: apis.length });
        setData({ ...data, apis });
      }
      action.toggleApiModal();
    },
    editAPi: (record: any, index: any) => {
      setState({
        ...state,
        currentApi: record,
        currentApiIndex: index,
        visibleApiModal: true,
      });
    },
    deleteApi: (index: number) => {
      let apis: object[] = data.apis || [];
      apis.splice(index, 1);
      setData({ ...data, apis });
    },
    onSubmit: async (e: any) => {
      e.preventDefault();
      let newData = cloneDeep(data);

      let apiData: any = {
        name: newData.title,
        group: newData.group,
        service: newData.service,
        remark: newData.subTitle,
        config: JSON.stringify(newData),
        version: 1,
      };

      // 存在 id 则是编辑
      if (state._id) {
        apiData._id = state._id;
      }
      await createOrUpdateApp(apiData);
      message.success('创建应用成功~', 1, () => {
        // 新建的时候，更新导航菜单
        if (!state._id) {
          refreshMenus();
        }
        router.push('/system/app/list');
      });
    },
  };

  const config = {
    apiColumns: [
      { title: '接口名称', dataIndex: 'name' },
      {
        title: '接口类型',
        dataIndex: 'method',
        render: (text: string) => <Tag color="purple">{String(text)}</Tag>,
      },
      { title: '接口地址', dataIndex: 'path' },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (text: any, record: any, index: number) => (
          <Fragment>
            <a
              href="javascript:;"
              onClick={() => {
                action.editAPi(record, index);
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <Popconfirm
              title="是否删除该组件？"
              onConfirm={() => {
                action.deleteApi(index);
              }}
            >
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </Fragment>
        ),
      },
    ],
    columns: [
      { title: '模块标题', dataIndex: 'title' },
      { title: '模块标识', dataIndex: 'name' },
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
    renderFormItem: ({ key, name, item }: any) => {
      return (
        <>
          <Col span={5}>
            <Input
              placeholder="全局按钮名称"
              value={item['label']}
              onChange={action.onChange.bind(null, `${name}[${key}].label`)}
            />
          </Col>
          <Col span={5}>
            <Input
              placeholder="模块标识"
              value={item['moduleName']}
              onChange={action.onChange.bind(null, `${name}[${key}].moduleName`)}
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
              value={data.group}
              onChange={action.onChange.bind(null, 'group')}
            >
              {list.group.map((item: any) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="服务组" required={true}>
            <Select
              placeholder="请选择应用接口所在服务"
              value={data.service}
              onChange={action.onChange.bind(null, 'service')}
            >
              {list.service.map((item: any) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </FormItem>
          <DynamicFieldSet
            label="工具栏按钮"
            btnLabel="添加工具栏按钮 (eg:添加应用)"
            name="toolbarControls"
            data={data}
            setData={setData}
            renderItem={jsx.renderFormItem}
          />
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
      <Card size="small" title="基本信息">
        {jsx.renderBaseInfo()}
      </Card>

      <Card
        size="small"
        title="接口列表"
        style={{ marginTop: 10 }}
        extra={
          <Button type="primary" onClick={action.toggleApiModal}>
            添加接口
          </Button>
        }
      >
        <Table
          size="small"
          rowKey="name"
          bordered={true}
          pagination={false}
          columns={config.apiColumns}
          dataSource={data['apis']}
        />
        {state.visibleApiModal && (
          <ModalApiConfig
            visible={state.visibleApiModal}
            initData={state.currentApi}
            onCancel={action.toggleApiModal}
            onOk={action.saveApi}
          />
        )}
      </Card>

      <Card
        size="small"
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
          rowKey="name"
          bordered={true}
          pagination={false}
          columns={config.columns}
          dataSource={data['modules']}
        />
        {state.visibleModuleModal && (
          <ModalComponentConfig
            visible={state.visibleModuleModal}
            apis={data['apis']}
            modules={data['modules']}
            initData={state.currentModule}
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
