import React, { useState } from 'react';
import { Table, Card, Button, Divider, Popconfirm, Modal } from 'antd';
import { cloneDeep } from 'lodash';

interface IDynamicTable {
  title: string;
  btnLabel: string;
  columns: any[];
  name: string; // 保存的字段名
  data: any; // 外部数据
  setData: Function; // 设置外部状态
  renderModal: Function;
}

export default ({
  title,
  columns,
  name,
  data,
  setData,
  btnLabel = '添加',
  renderModal = () => {},
}: IDynamicTable) => {
  const [state, setState]: any = useState({
    visible: false,
    currentIndex: -1,
    currentData: {},
  });

  let action = {
    toggle: () => {
      setState({
        ...state,
        visible: !state.visible,
      });
    },
    save: (values: any) => {
      let list = data[name] || [];
      // 有当前组件标记，则是编辑，否则是新增
      if (state.currentIndex !== -1) {
        list[state.currentIndex] = {
          ...list[state.currentIndex],
          ...values,
        };
      } else {
        list.push({ ...values, key: list.length });
        setData({ ...data, [name]: list });
      }
      action.toggle();
    },
    edit: (record: any, index: number) => {
      setState({
        currentData: record,
        currentIndex: index,
        visible: true,
      });
    },
    delete: (index: number) => {
      let list: object[] = data[name] || [];
      list.splice(index, 1);
      setData({ ...data, [name]: list });
    },
  };

  // 为表格添加操作字段
  let columnsAddOperation = cloneDeep(columns);
  columnsAddOperation.push({
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: (text: any, record: any, index: number) => (
      <>
        <a
          href="javascript:;"
          onClick={() => {
            action.edit(record, index);
          }}
        >
          编辑
        </a>
        <Divider type="vertical" />
        <Popconfirm
          title="是否删除该组件？"
          onConfirm={() => {
            action.delete(index);
          }}
        >
          <a href="javascript:;">删除</a>
        </Popconfirm>
      </>
    ),
  });

  return (
    <Card
      size="small"
      title={title}
      style={{ marginTop: 10 }}
      extra={
        <Button type="primary" onClick={action.toggle}>
          {btnLabel}
        </Button>
      }
    >
      <Table
        size="small"
        rowKey="name"
        bordered={true}
        pagination={false}
        columns={columnsAddOperation}
        dataSource={data[name]}
      />
      {state.visible &&
        renderModal({
          visible: state.visible,
          initData: state.currentData,
          onCancel: action.toggle,
          onOk: action.save,
        })}
    </Card>
  );
};
