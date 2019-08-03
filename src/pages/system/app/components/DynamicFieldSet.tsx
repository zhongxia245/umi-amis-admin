import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Button, Row, Col } from 'antd';

let id = 0;

export default class DynamicFieldSet extends Component {
  static defaultProps = {
    label: '列表',
    btnLabel: '添加',
  };

  getKeysName = () => {
    const { name }: any = this.props;
    return `_keys_${name}`;
  };

  remove = (k: any) => {
    const { form }: any = this.props;
    const keys = form.getFieldValue(this.getKeysName());
    form.setFieldsValue({
      [this.getKeysName()]: keys.filter((key: any) => key !== k),
    });
  };

  add = () => {
    const { form }: any = this.props;
    const keys = form.getFieldValue(this.getKeysName());
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      [this.getKeysName()]: nextKeys,
    });
  };

  render() {
    const { label, btnLabel, renderItem, form }: any = this.props;
    const { getFieldDecorator, getFieldValue } = form;
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
    getFieldDecorator(this.getKeysName(), { initialValue: [] });
    const keys = getFieldValue(this.getKeysName());

    const formItems = keys.map((k: any, index: number) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? label : ''}
        required={false}
        key={k}
      >
        <Row gutter={24}>
          {renderItem(k)}
          <Col span={2}>
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          </Col>
        </Row>
      </Form.Item>
    ));

    return (
      <Fragment>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> {btnLabel}
          </Button>
        </Form.Item>
      </Fragment>
    );
  }
}
