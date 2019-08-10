import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Modal, Alert, Card } from 'antd';
import { set, cloneDeep, isEmpty } from 'lodash';
import { TableConfig, FormConfig, IFrameConfig } from './module';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

interface IModalComponentConfig {
  apis: Array<any>; // 应用可用 API 的列表
  visible: boolean;
  modules?: any[];
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

export default ({
  visible,
  initData = {},
  apis = [],
  onCancel = () => {},
  onOk = () => {},
}: IModalComponentConfig) => {
  const [data, setData]: any = useState({
    layout: '',
    type: 'crud',
  });

  useEffect(() => {
    if (!isEmpty(initData)) {
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
    onSubmit: (e: any) => {
      e.preventDefault();
      onOk(data);
    },
  };

  const jsx = {
    renderModuleConfigForm: () => {
      switch (data.type) {
        case 'crud':
          return (
            <TableConfig data={data} setData={setData} apis={apis} onChange={action.onChange} />
          );
        case 'form':
          return (
            <FormConfig data={data} setData={setData} apis={apis} onChange={action.onChange} />
          );
        case 'iframe':
          return (
            <IFrameConfig data={data} setData={setData} apis={apis} onChange={action.onChange} />
          );
        default:
          return <Alert type="error" message="暂时没有改组件类型的可视化配置页面" />;
      }
    },
  };

  return (
    <Modal
      title="模块配置"
      width={1000}
      maskClosable={false}
      visible={visible}
      onCancel={onCancel}
      onOk={action.onSubmit}
    >
      <Form {...formItemLayout}>
        <FormItem label="模块名称" required={true}>
          <Input
            placeholder="模块的名称"
            value={data.title}
            onChange={action.onChange.bind(null, 'title')}
          />
        </FormItem>
        <FormItem label="模块标识" required={true}>
          <Input
            placeholder="模块标识，用于其他模块调用"
            value={data.name}
            onChange={action.onChange.bind(null, 'name')}
          />
        </FormItem>
        <FormItem
          label="模块布局"
          required={true}
          help="默认布局 => 初始会渲染在页面上 ||  弹窗 => 点击后才会弹出"
        >
          <RadioGroup value={data.layout} onChange={action.onChange.bind(null, 'layout')}>
            <Radio value="">默认布局</Radio>
            <Radio value="dialog">弹窗</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="模块类型" required={true}>
          <RadioGroup value={data.type} onChange={action.onChange.bind(null, 'type')}>
            <Radio value="crud">crud</Radio>
            <Radio value="form">form</Radio>
            <Radio value="iframe">IFrame</Radio>
          </RadioGroup>
        </FormItem>
        <Card size="small" title={`${data.type}配置`}>
          {jsx.renderModuleConfigForm()}
        </Card>
      </Form>
    </Modal>
  );
};
