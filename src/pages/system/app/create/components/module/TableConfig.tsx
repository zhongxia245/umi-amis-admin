import React from 'react';
import { Form, Input, Col, Select } from 'antd';
import DynamicFieldSet from '@/components/DynamicFieldSet';
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
              showSearch={true}
              value={item['type']}
              onSelect={onChange.bind(null, `${name}[${key}].type`)}
            >
              {CONTROLS_FORM_TYPES.map((item, i) => {
                return (
                  <Option key={i} value={item.value}>
                    {`${item.value}-${item.label}`}
                  </Option>
                );
              })}
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
        <Select value={data.apiName} onChange={onChange.bind(null, 'apiName')}>
          {apis &&
            apis.map((item, i) => {
              return (
                <Option key={i} value={item.name}>
                  {item.name}
                </Option>
              );
            })}
        </Select>
      </FormItem>
      <FormItem label="表格数据字段">
        <Input
          type="text"
          placeholder="表格使用的接口返回字段, 默认 data"
          value={data.dataField}
          onChange={onChange.bind(null, 'dataField')}
        />
      </FormItem>
      <DynamicFieldSet
        label="搜索字段"
        btnLabel="添加表格搜索字段"
        name="filterControls"
        data={data}
        setData={setData}
        defaultValue={{ type: 'text' }}
        renderItem={jsx.renderFormItem}
      />

      <DynamicFieldSet
        label="表格字段"
        btnLabel="添加表格字段"
        name="columns"
        data={data}
        setData={setData}
        defaultValue={{ type: 'text' }}
        renderItem={jsx.renderFormItem}
      />

      <DynamicFieldSet
        label="操作字段"
        btnLabel="添加操作字段"
        name="columnsOperation"
        data={data}
        setData={setData}
        renderItem={jsx.renderOperation}
      />
    </>
  );
};
