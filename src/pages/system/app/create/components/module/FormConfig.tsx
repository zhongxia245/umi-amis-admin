import React from 'react';
import { Form, Input, Col, Select } from 'antd';
import DynamicFieldSet from '../DynamicFieldSet';
import { CONTROLS_FORM_TYPES } from '@/config';

const FormItem = Form.Item;
const Option = Select.Option;

export default ({
  data,
  setData,
  apis,
  onChange,
}: {
  data: any;
  setData: any;
  apis: any[];
  onChange: Function;
}) => {
  const jsx = {
    renderFormItem: ({ key, name, item }: any) => {
      return (
        <>
          <Col span={5}>
            <Input
              placeholder="label"
              value={item['label']}
              onChange={onChange.bind(null, `${name}[${key}].label`)}
            />
          </Col>
          <Col span={5}>
            <Input
              placeholder="name"
              value={item['name']}
              onChange={onChange.bind(null, `${name}[${key}].name`)}
            />
          </Col>
          <Col span={5}>
            <Select
              placeholder="请选择组件类型"
              value={item['type']}
              onChange={onChange.bind(null, `${name}[${key}].type`)}
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
              onChange={onChange.bind(null, `${name}[${key}].value`)}
            />
          </Col>
        </>
      );
    },
  };

  return (
    <>
      <FormItem label="提交接口">
        <Select value={data.api} onChange={onChange.bind(null, 'api')}>
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
        <Select
          placeholder="不设置则从表格记录获取或者为空"
          value={data.initApi}
          onChange={onChange.bind(null, 'initApi')}
        >
          <Option value="">不需要</Option>
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
      <DynamicFieldSet
        label="表单字段"
        btnLabel="添加表单字段"
        name="controls"
        data={data}
        setData={setData}
        renderItem={jsx.renderFormItem}
      />
    </>
  );
};
