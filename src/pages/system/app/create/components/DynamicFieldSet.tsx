import React, { useEffect } from 'react';
import { Form, Icon, Button, Row, Col } from 'antd';

let id = 0;

interface IDynamicFieldSetProps {
  name: string; // 字段标识
  form: any; // form 对象，由外部传入
  renderItem: Function; // 渲染表单项
  label?: string; // 字段名称
  btnLabel?: string; // 按钮名称
  initialValue?: any[]; // 按钮名称
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

export default ({
  name,
  form,
  label,
  btnLabel,
  renderItem,
  initialValue = [],
}: IDynamicFieldSetProps) => {
  const { getFieldDecorator, getFieldValue, setFieldsValue } = form;
  const keysName = `_keys_${name}`;

  let action = {
    getInitKeys: () => {
      let nextKeys: number[] = [];
      for (let i = 0; i < initialValue.length; i++) {
        nextKeys.push(id++);
      }
      return nextKeys;
    },
    remove: (k: any) => {
      const keys = getFieldValue(keysName);
      setFieldsValue({
        [keysName]: keys.filter((key: any) => key !== k),
      });
    },

    add: () => {
      const keys = getFieldValue(keysName);
      const nextKeys = keys.concat(id++);
      setFieldsValue({
        [keysName]: nextKeys,
      });
    },
  };

  // 初次渲染 keys 为空，因此使用外部传入的初始值 【如果需要初始赋值的话】
  // 非初次渲染，则keys 有值，直接使用即可
  const keys = getFieldValue(keysName);
  let initKeys = keys || action.getInitKeys();
  getFieldDecorator(keysName, { initialValue: initKeys });

  const formItems = initKeys.map((k: any, index: number) => {
    return (
      <Form.Item
        key={k}
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? label : ''}
        required={false}
      >
        <Row gutter={24}>
          {renderItem(k, initialValue[k], name)}
          <Col span={2}>
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => action.remove(k)}
            />
          </Col>
        </Row>
      </Form.Item>
    );
  });

  return (
    <>
      {formItems}
      <Form.Item {...formItemLayoutWithOutLabel}>
        <Button type="dashed" onClick={action.add} style={{ width: 400 }}>
          <Icon type="plus" /> {btnLabel}
        </Button>
      </Form.Item>
    </>
  );
};
