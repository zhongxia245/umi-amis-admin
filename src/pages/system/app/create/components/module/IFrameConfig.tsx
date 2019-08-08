import React from 'react';
import { Form, Input, Select, InputNumber } from 'antd';

const FormItem = Form.Item;

export default ({
  data,
  onChange,
}: {
  data: any;
  onChange: Function;
  setData?: any;
  apis?: any[];
}) => {
  return (
    <>
      <FormItem label="页面地址">
        <Input
          placeholder="请输入IFrame地址"
          value={data.src}
          onChange={onChange.bind(null, 'src')}
        />
      </FormItem>
      <FormItem label="IFrame高度">
        <InputNumber
          style={{ width: '100%' }}
          placeholder="设置IFrame高度"
          value={data.height}
          onChange={onChange.bind(null, 'height')}
        />
      </FormItem>
    </>
  );
};
