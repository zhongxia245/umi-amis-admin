import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { set, cloneDeep, isEmpty } from 'lodash';

const FormItem = Form.Item;
const Option = Select.Option;

interface IModalComponentConfig {
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

export default ({ visible, initData = {}, onCancel = () => {}, onOk = () => {} }: IModalComponentConfig) => {
  const [data, setData]: any = useState({
    name: '',
    method: 'get',
    path: '',
    remark: '',
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

  return (
    <Modal title="接口配置" maskClosable={false} visible={visible} onCancel={onCancel} onOk={action.onSubmit}>
      <Form {...formItemLayout}>
        <FormItem label="接口标识" required={true}>
          <Input
            placeholder="接口标识必须保证应用内唯一"
            value={data.name}
            onChange={action.onChange.bind(null, 'name')}
          />
        </FormItem>
        <FormItem label="接口类型" required={true}>
          <Select value={data.method} onChange={action.onChange.bind(null, 'method')}>
            <Option value="get">GET</Option>
            <Option value="post">POST</Option>
            <Option value="delete">DELETE</Option>
            <Option value="put">PUT</Option>
          </Select>
        </FormItem>
        <FormItem label="接口地址" required={true}>
          <Input
            placeholder="$id可使用变量名，eg: /api/app/$id"
            value={data.path}
            onChange={action.onChange.bind(null, 'path')}
          />
        </FormItem>
        <FormItem label="接口描述">
          <Input.TextArea placeholder="介绍接口" value={data.remark} onChange={action.onChange.bind(null, 'remark')} />
        </FormItem>
      </Form>
    </Modal>
  );
};
