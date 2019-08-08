import React, { useEffect, useState } from 'react';
import { Form, Input, Switch, Radio, Select, Col, Divider, Modal, Alert } from 'antd';
import { set, cloneDeep, compact, isEmpty, find } from 'lodash';
import { CONTROLS_FORM_TYPES } from '@/config';
import DynamicFieldSet from './DynamicFieldSet';
import { TableConfig, FormConfig, IFrameConfig } from './module';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

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

const ModalComponentConfig: React.SFC<IModalComponentConfig> = ({
  visible,
  initData = {},
  apis = [],
  modules = [],
  onCancel = () => {},
  onOk = () => {},
}) => {
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
    filterData: (data: any) => {
      data.columns = compact(data.columns) || [];
      data.controls = compact(data.controls);

      data.columns = data.columns.filter((item: any) => item.type !== 'operation');

      // 增加操作列
      if (data.columns_operation) {
        let buttons: any[] = [];
        data.columns_operation.map((item: any) => {
          if (item.moduleName) {
            let moduleConfig = find(modules, obj => {
              return obj.name === item.moduleName;
            });
            item['dialog'] = {
              title: item.label,
              body: moduleConfig,
            };
          }
          buttons.push(item);
        });

        data.columns.push({
          type: 'operation',
          label: '操作',
          buttons: buttons,
        });
      }
      // 过滤条件
      if (data.filter_controls && data.filter_controls.length > 0) {
        // 搜索按钮默认放在最后一个搜索字段
        data.filter_controls[data.filter.length - 1].addOn = {
          label: '搜索',
          type: 'submit',
        };
        data.filter = {
          title: '条件过滤',
          controls: data.filter_controls || [],
        };
      }

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
          <Col span={5}>
            <Input
              placeholder="label"
              value={item['label']}
              onChange={action.onChange.bind(null, `${name}[${key}].label`)}
            />
          </Col>
          <Col span={5}>
            <Input
              placeholder="name"
              value={item['name']}
              onChange={action.onChange.bind(null, `${name}[${key}].name`)}
            />
          </Col>
          <Col span={5}>
            <Select
              placeholder="请选择组件类型"
              value={item['type']}
              onChange={action.onChange.bind(null, `${name}[${key}].type`)}
            >
              {CONTROLS_FORM_TYPES.map((item, i) => (
                <Option key={i} value={item.value}>
                  {`${item.value}-${item.label}`}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={5}>
            <Input
              placeholder="默认值"
              value={item['value']}
              onChange={action.onChange.bind(null, `${name}[${key}].value`)}
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
            name="filter_controls"
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
        <FormItem label="是否启用" required={true}>
          <Switch checked={data.name} onChange={action.onChange.bind(null, 'name')} />
        </FormItem>
        <FormItem label="模块布局" required={true}>
          <RadioGroup value={data.layout} onChange={action.onChange.bind(null, 'layout')}>
            <Radio value="">默认布局</Radio>
            <Radio value="tabs">选项卡</Radio>
            <Radio value="grid">grid</Radio>
            <Radio value="dialog">弹窗</Radio>
            <Radio value="drawer">抽屉</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="模块类型" required={true}>
          <RadioGroup value={data.type} onChange={action.onChange.bind(null, 'type')}>
            <Radio value="crud">表格</Radio>
            <Radio value="form">表单</Radio>
            <Radio value="wizard">分步表单</Radio>
            <Radio value="iframe">IFrame</Radio>
          </RadioGroup>
        </FormItem>

        <Divider />

        {jsx.renderModuleConfigForm()}
      </Form>
    </Modal>
  );
};

export default ModalComponentConfig;
