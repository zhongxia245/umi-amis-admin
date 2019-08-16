import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Table,
  Divider,
  Switch,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
} from 'antd';
import { getGroup, deleteGroup, addOrUpdateGroup } from '@/api';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const Group = ({ form }: any) => {
  const { getFieldDecorator, validateFieldsAndScroll } = form;
  const [data, setData]: any = useState({
    dataSource: [],
    loading: false,
    visible: false,
    currentData: {},
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    action.getData();
  }, []);

  const action = {
    getData: async () => {
      setData({ ...data, loading: true });
      let result: any = await getGroup();
      setData({ ...data, dataSource: result, loading: false, visible: false });
    },
    onDelete: async (id: string) => {
      await deleteGroup(id);
      message.success('删除成功!');
      action.getData();
    },
    onEdit: (record: any) => {
      setData({ ...data, visible: true, currentData: record });
    },
    onCancel: () => {
      setData({ ...data, visible: false, currentData: {} });
    },
    onAdd: () => {
      setData({ ...data, visible: true });
    },
    onSubmit: (e: any) => {
      e.preventDefault();
      validateFieldsAndScroll(async (err: any, formData: object) => {
        if (!err) {
          console.log(formData);
          await addOrUpdateGroup(formData);
          await action.getData();
          message.success('添加分组成功!');
        }
      });
    },
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      width: 120,
    },
    {
      title: '分组名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'remark',
    },
    {
      title: '分组状态',
      dataIndex: 'status',
      render: (val: any) => <Switch checked={!!val} />,
    },
    {
      title: '操作',
      render: (text: string, record: any) => (
        <span>
          <a
            href="javascript:;"
            onClick={() => {
              action.onEdit(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title={`是否删除该分组?`}
            okText="是"
            cancelText="否"
            onConfirm={() => {
              action.onDelete(record._id);
            }}
          >
            <a href="javascript:;">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Card
      title="应用分组"
      extra={
        <Button type="primary" onClick={action.onAdd}>
          添加分组
        </Button>
      }
    >
      <Table
        rowKey="_id"
        size="middle"
        loading={data.loading}
        bordered={true}
        pagination={false}
        columns={columns}
        dataSource={data.dataSource}
      />
      <Modal
        title="编辑分组"
        maskClosable={false}
        visible={data.visible}
        onCancel={action.onCancel}
        onOk={action.onSubmit}
      >
        <Form {...formItemLayout}>
          {data.currentData._id && (
            <FormItem label="ID">
              {getFieldDecorator('_id', {
                initialValue: data.currentData._id,
              })(<Input disabled={true} />)}
            </FormItem>
          )}
          <FormItem label="分组名称">
            {getFieldDecorator('name', {
              initialValue: data.currentData.name,
              rules: [{ required: true, message: '分组名称不能为空' }],
            })(<Input placeholder="请输入分组名称" />)}
          </FormItem>
          <FormItem label="分组描述">
            {getFieldDecorator('remark', { initialValue: data.currentData.remark })(
              <TextArea rows={3} placeholder="请输入分组描述" />,
            )}
          </FormItem>
          <FormItem label="分组状态">
            {getFieldDecorator('status', {
              initialValue:
                data.currentData.status === undefined ? true : !!data.currentData.status,
              valuePropName: 'checked',
            })(<Switch />)}
          </FormItem>
        </Form>
      </Modal>
    </Card>
  );
};

export default Form.create({ name: 'group' })(Group);
