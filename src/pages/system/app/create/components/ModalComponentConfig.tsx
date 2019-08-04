import React, { useEffect } from 'react';
import { Form, Input, Switch, Radio, Select, Col, Divider, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { isEmpty } from 'lodash';
import DynamicFieldSet from './DynamicFieldSet';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

interface IModalComponentConfig extends FormComponentProps {
  apis: Array<any>; // 应用可用 API 的列表
  visible: boolean;
  form: any;
  initialValue?: any;
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

const ModalComponentConfig: React.SFC<IModalComponentConfig> = ({
  form,
  visible,
  apis = [],
  initialValue = {},
  onCancel = () => {},
  onOk = () => {},
}) => {
  const { getFieldDecorator, getFieldsValue, setFieldsValue } = form;
  let formData = getFieldsValue();

  useEffect(() => {
    console.log('initModalComponent', initialValue);
    if (!isEmpty(initialValue) && visible) {
      setFieldsValue(initialValue);
    }
  }, [initialValue]);

  const action = {
    onSubmit: (e: any) => {
      e.preventDefault();
      form.validateFields((err: any, values: object) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        form.resetFields();
        onOk(values);
      });
    },
  };

  const jsx = {
    // 渲染表单字段，表格字段，表格搜索字段
    renderFormItem: (key: string, item: any, name: string) => {
      item = item || {};
      return (
        <>
          <Col span={6}>
            {getFieldDecorator(`${name}[${key}].name`, { initialValue: item.name })(
              <Input placeholder="name" />,
            )}
          </Col>
          <Col span={6}>
            {getFieldDecorator(`${name}[${key}].label`, { initialValue: item.label })(
              <Input placeholder="label" />,
            )}
          </Col>
          <Col span={6}>
            {getFieldDecorator(`${name}[${key}].remark`, { initialValue: item.remark })(
              <Input placeholder="remark" />,
            )}
          </Col>
        </>
      );
    },
    renderTableConfig: () => {
      return (
        <>
          <DynamicFieldSet
            label="表格搜索"
            btnLabel="添加表格搜索字段"
            name="filter"
            form={form}
            initialValue={[]}
            renderItem={jsx.renderFormItem}
          />

          <DynamicFieldSet
            label="表格字段"
            btnLabel="添加表格字段"
            name="columns"
            form={form}
            initialValue={[]}
            renderItem={jsx.renderFormItem}
          />
        </>
      );
    },
    renderFormConfig: () => {
      return (
        <DynamicFieldSet
          label="表格字段"
          btnLabel="添加表格字段"
          name="controls"
          form={form}
          initialValue={[]}
          renderItem={jsx.renderFormItem}
        />
      );
    },
  };

  return (
    <Modal
      title="组件配置"
      width={900}
      maskClosable={false}
      visible={visible}
      onCancel={onCancel}
      onOk={action.onSubmit}
    >
      <Form {...formItemLayout}>
        <FormItem label="组件名称">
          {getFieldDecorator('name')(<Input placeholder="组件的名称" />)}
        </FormItem>
        <FormItem label="主体组件">
          {getFieldDecorator('main', { valuePropName: 'checked' })(<Switch />)}
        </FormItem>
        <FormItem label="组件类型">
          {getFieldDecorator('type')(
            <RadioGroup>
              <Radio value="crud">表格</Radio>
              <Radio value="form">表单</Radio>
            </RadioGroup>,
          )}
        </FormItem>
        <FormItem label="提交接口">
          {getFieldDecorator('api')(
            <Select>
              {apis &&
                apis.map((item, i) => {
                  return (
                    <Option key={i} value={item.value}>
                      {item.label}
                    </Option>
                  );
                })}
            </Select>,
          )}
        </FormItem>
        <FormItem label="初始化接口">
          {getFieldDecorator('initApi')(
            <Select>
              {apis &&
                apis.map((item, i) => {
                  return (
                    <Option key={i} value={item.value}>
                      {item.label}
                    </Option>
                  );
                })}
            </Select>,
          )}
        </FormItem>

        <Divider />

        <div hidden={formData.type !== 'crud'}>{jsx.renderTableConfig()}</div>
        <div hidden={formData.type !== 'form'}>{jsx.renderFormConfig()}</div>

        {/* {formData.type === 'crud' && jsx.renderTableConfig()} */}
        {/* {formData.type === 'form' && jsx.renderFormConfig()} */}
      </Form>
    </Modal>
  );
};

export default Form.create<IModalComponentConfig>({ name: 'component_config' })(
  ModalComponentConfig,
);
