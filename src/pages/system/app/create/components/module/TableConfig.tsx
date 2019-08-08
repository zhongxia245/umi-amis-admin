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
              value={item['type'] || CONTROLS_FORM_TYPES[0].value}
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
    renderOperation: ({ key, name, item }: any) => {
      return (
        <>
          <Col span={5}>
            <Input
              placeholder="操作列名称"
              value={item['label']}
              onChange={onChange.bind(null, `${name}[${key}].label`)}
            />
          </Col>
          <Col span={5}>
            <Select
              placeholder="展示形式"
              value={item['actionType']}
              onChange={onChange.bind(null, `${name}[${key}].actionType`)}
            >
              <Option value="dialog">弹窗-dialog</Option>
              <Option value="drawer">抽屉-drawer</Option>
            </Select>
          </Col>
          <Col span={5}>
            <Input
              placeholder="操作模块name"
              value={item['moduleName']}
              onChange={onChange.bind(null, `${name}[${key}].moduleName`)}
            />
          </Col>
        </>
      );
    },
  };

  return (
    <>
      <FormItem label="数据接口" required={true}>
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
      <DynamicFieldSet
        label="搜索字段"
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

      <DynamicFieldSet
        label="操作字段"
        btnLabel="添加操作字段"
        name="columns_operation"
        data={data}
        setData={setData}
        renderItem={jsx.renderOperation}
      />
    </>
  );
};
