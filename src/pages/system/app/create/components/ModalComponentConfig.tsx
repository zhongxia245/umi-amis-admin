import React, { useEffect, useState } from 'react';
import { Form, Input, Switch, Radio, Select, Col, Divider, Modal } from 'antd';
import { set, cloneDeep, compact } from 'lodash';
import DynamicFieldSet from './DynamicFieldSet';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

interface IModalComponentConfig {
  apis: Array<any>; // 应用可用 API 的列表
  visible: boolean;
  initData?: any;
  onCancel?: any;
  onOk?: any;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const ModalComponentConfig: React.SFC<IModalComponentConfig> = ({
  visible,
  initData = {},
  apis = [],
  onCancel = () => {},
  onOk = () => {},
}) => {
  const [data, setData]: any = useState({});

  useEffect(() => {
    if (initData) {
      setData(initData);
    }
  }, [initData]);

  const action = {
    onChange: (name: string, e: any) => {
      let val = e.target ? e.target.value : e;
      let newData = cloneDeep(data);
      set(newData, name, val);
      setData(newData);
    },
    filterData: (data: any) => {
      data.filter = compact(data.filter);
      data.columns = compact(data.columns);
      data.controls = compact(data.controls);
      return data;
    },
    onSubmit: (e: any) => {
      e.preventDefault();
      let newData = action.filterData(data);
      onOk(newData);
    },
  };

  const jsx = {
    // 渲染表单字段，表格搜索字段
    renderFormItem: ({ key, name, item }: any) => {
      return (
        <>
          <Col span={6}>
            <Input
              placeholder="label"
              value={item['label']}
              onChange={action.onChange.bind(null, `${name}[${key}].label`)}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder="name"
              value={item['name']}
              onChange={action.onChange.bind(null, `${name}[${key}].name`)}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder="type"
              value={item['type']}
              onChange={action.onChange.bind(null, `${name}[${key}].type`)}
            />
          </Col>
        </>
      );
    },
    renderTableConfig: () => {
      return (
        <>
          <DynamicFieldSet
            label="表格搜索"
            btnLabel="添加表格搜索字段"
            name="filter"
            data={data}
            setData={setData}
            renderItem={jsx.renderFormItem}
          />

          <DynamicFieldSet
            label="表格字段"
            btnLabel="添加表格字段"
            name="columns"
            data={data}
            setData={setData}
            renderItem={jsx.renderFormItem}
          />
        </>
      );
    },
    renderFormConfig: () => {
      return (
        <DynamicFieldSet
          label="表格字段"
          btnLabel="添加表格字段"
          name="controls"
          data={data}
          setData={setData}
          renderItem={jsx.renderFormItem}
        />
      );
    },
  };

  return (
    <Modal
      title="组件配置"
      width={900}
      maskClosable={false}
      visible={visible}
      onCancel={onCancel}
      onOk={action.onSubmit}
    >
      <Form {...formItemLayout}>
        <FormItem label="组件名称">
          <Input
            placeholder="组件的名称"
            value={data.name}
            onChange={action.onChange.bind(null, 'name')}
          />
        </FormItem>
        <FormItem label="主体组件">
          <Switch checked={data.main} onChange={action.onChange.bind(null, 'main')} />
        </FormItem>
        <FormItem label="组件类型">
          <RadioGroup value={data.type} onChange={action.onChange.bind(null, 'type')}>
            <Radio value="crud">表格</Radio>
            <Radio value="form">表单</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="提交接口">
          <Select value={data.api} onChange={action.onChange.bind(null, 'api')}>
            {apis &&
              apis.map((item, i) => {
                return (
                  <Option key={i} value={item.value}>
                    {item.label}
                  </Option>
                );
              })}
          </Select>
        </FormItem>
        <FormItem label="初始化接口">
          <Select value={data.initApi} onChange={action.onChange.bind(null, 'initApi')}>
            {apis &&
              apis.map((item, i) => {
                return (
                  <Option key={i} value={item.value}>
                    {item.label}
                  </Option>
                );
              })}
          </Select>
        </FormItem>

        <Divider />

        <div hidden={data.type !== 'crud'}>{jsx.renderTableConfig()}</div>
        <div hidden={data.type !== 'form'}>{jsx.renderFormConfig()}</div>
      </Form>
    </Modal>
  );
};

export default ModalComponentConfig;
