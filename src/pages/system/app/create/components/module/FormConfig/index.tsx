import React from 'react';
import { Form, Select } from 'antd';
import DynamicTable from '@/components/DynamicTable';
import ModalConfig from './ModalConfig';

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
  const columns = [
    { title: '字段名称', dataIndex: 'label' },
    { title: '字段标识', dataIndex: 'name' },
    { title: '字段类型', dataIndex: 'type' },
    { title: '默认值', dataIndex: 'value' },
  ];

  return (
    <>
      <FormItem label="提交接口">
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
      <FormItem label="初始化接口">
        <Select
          placeholder="不设置则从表格记录获取或者为空"
          value={data.initApiName}
          onChange={onChange.bind(null, 'initApiName')}
        >
          <Option value="">不需要</Option>
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
      <DynamicTable
        title="表单字段列表"
        name="controls"
        data={data}
        setData={setData}
        columns={columns}
        renderModal={(someprops: any) => {
          return <ModalConfig title="添加表单字段" {...someprops} />;
        }}
      />
    </>
  );
};
