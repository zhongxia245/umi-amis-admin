import React, { useEffect } from 'react';
import { Form, Icon, Button, Row, Col } from 'antd';
import { cloneDeep } from 'lodash';

let id = 0;

interface IDynamicFieldSetProps {
  name: string; // 字段标识
  data: any; // 表单数据
  setData: Function; // 渲染表单项
  renderItem: Function; // 渲染表单项
  label?: string; // 字段名称
  btnLabel?: string; // 按钮名称
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

export default ({ name, data, label, btnLabel, renderItem, setData }: IDynamicFieldSetProps) => {
  const fields = data[name] || [];

  // 给动态列表添加唯一标识，当做 key
  fields.map((item: any = {}) => {
    if (!item._key) {
      item._key = id++;
    }
    return item;
  });

  let action = {
    remove: (index: number) => {
      const nextFields = cloneDeep(fields);
      nextFields.splice(index, 1);
      setData({ ...data, [name]: nextFields });
    },
    add: () => {
      const nextFields = fields.concat({ _key: id++ });
      setData({ ...data, [name]: nextFields });
    },
  };

  const formItems = fields.map((item: any, index: number) => {
    return (
      <Form.Item
        key={item._key}
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? label : ''}
        required={false}
      >
        <Row gutter={24}>
          {renderItem({ key: index, item, name })}
          <Col span={2}>
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => action.remove(index)}
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
        <Button type="dashed" onClick={action.add} style={{ width: 300 }}>
          <Icon type="plus" /> {btnLabel}
        </Button>
      </Form.Item>
    </>
  );
};
