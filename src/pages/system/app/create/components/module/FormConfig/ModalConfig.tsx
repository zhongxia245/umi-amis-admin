import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Col } from 'antd';
import { set, cloneDeep, isEmpty } from 'lodash';
import { CONTROLS_FORM_TYPES } from '@/config';
import DynamicFieldSet from '@/components/DynamicFieldSet';

const FormItem = Form.Item;
const Option = Select.Option;

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

interface IModalFormItemConfig {
  title: string;
  visible: boolean | undefined;
  initData: any;
  onCancel: any;
  onOk: any;
}

export default ({
  title,
  visible,
  initData,
  onCancel = () => {},
  onOk = () => {},
}: IModalFormItemConfig) => {
  const [data, setData]: any = useState({
    type: 'text',
  });

  useEffect(() => {
    if (!isEmpty(initData)) {
      setData(initData);
    }
  }, [initData]);

  const action = {
    isShowOptions: (type: string) => {
      let control = CONTROLS_FORM_TYPES.filter((item: any) => item.value === type);
      if (control && control.length > 0 && control[0].hasOptions) {
        return true;
      }
      return false;
    },
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
    renderFormItem: ({ key, name, item }: any) => {
      return (
        <>
          <Col span={10}>
            <Input
              placeholder="label"
              value={item['label']}
              onChange={action.onChange.bind(null, `${name}[${key}].label`)}
            />
          </Col>
          <Col span={10}>
            <Input
              placeholder="value"
              value={item['value']}
              onChange={action.onChange.bind(null, `${name}[${key}].value`)}
            />
          </Col>
        </>
      );
    },
  };

  return (
    <Modal
      width={600}
      maskClosable={false}
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={action.onSubmit}
    >
      <Form {...formItemLayout}>
        <FormItem label="字段名称" required={true}>
          <Input
            placeholder="字段的中文名"
            value={data.label}
            onChange={action.onChange.bind(null, 'label')}
          />
        </FormItem>
        <FormItem label="字段标识" required={true}>
          <Input
            placeholder="字段的数据标识"
            value={data.name}
            onChange={action.onChange.bind(null, 'name')}
          />
        </FormItem>
        <FormItem label="字段类型" required={true}>
          <Select
            placeholder="请选择组件类型"
            showSearch={true}
            value={data.type}
            onChange={action.onChange.bind(null, 'type')}
          >
            {CONTROLS_FORM_TYPES.map((item, i) => (
              <Option key={i} value={item.value}>
                {`${item.value}-${item.label}`}
              </Option>
            ))}
          </Select>
        </FormItem>
        {/* 这几个组件需要设置下拉选项 */}
        {action.isShowOptions(data.type) && (
          <>
            <DynamicFieldSet
              label="选项列表"
              btnLabel="添加选项"
              name="options"
              data={data}
              setData={setData}
              renderItem={jsx.renderFormItem}
            />
            <FormItem label="动态选项">
              <Input
                placeholder="选项从接口获取"
                value={data.source}
                onChange={action.onChange.bind(null, 'source')}
              />
            </FormItem>
          </>
        )}
        <FormItem label="字段默认值">
          <Input value={data.value} onChange={action.onChange.bind(null, 'value')} />
        </FormItem>
      </Form>
    </Modal>
  );
};
