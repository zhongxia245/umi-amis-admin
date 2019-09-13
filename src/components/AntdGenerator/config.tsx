import React, { useContext } from 'react';
import Antd from 'antd';
import { AppContext } from './store';

const render = (Comp: any) => ({ children, ...otherProps }: any) => (
  <Comp {...otherProps}>{children}</Comp>
);

const withActionRender = (Comp: any) => ({ actionType, children, ...otherProps }: any) => {
  if (actionType) {
    return (
      <Comp
        {...otherProps}
        onClick={() => {
          supportActions[actionType](otherProps[actionType]);
        }}
      >
        {actionType === 'modal' && supportActions[actionType](otherProps[actionType])}
        {children}
      </Comp>
    );
  } else {
    return <Comp {...otherProps}>{children}</Comp>;
  }
};

/**
 * 支持的组件类型
 * 如果是 Antd 基本组件，直接组装下返回
 * 如果是自定义组件，则需要自己编写实现
 *
 * Antd 提供的基础组件有点多，因此需要对组件分优先级，优先实现优先级高的组件
 * 一级：Card , Table, Form , Modal, message
 * 二级：表单组件, Input, TextArea, Radio, Select, Checkbox, DatePicker, Switch, Upload
 */
const supportComps: any = {
  //==================通用====================
  Button: withActionRender(Antd.Button),
  Icon: render(Antd.Icon),
  'Typography.Paragraph': render(Antd.Typography.Paragraph),
  //==================布局====================
  Row: render(Antd.Row),
  Col: render(Antd.Col),
  Layout: render(Antd.Layout),
  'Layout.Header': render(Antd.Layout.Header),
  'Layout.Footer': render(Antd.Layout.Footer),
  'Layout.Sider': render(Antd.Layout.Sider),
  'Layout.Content': render(Antd.Layout.Content),
  //==================导航====================
  Affix: render(Antd.Affix),
  Breadcrumb: render(Antd.Breadcrumb),
  'Breadcrumb.Item': render(Antd.Breadcrumb.Item),
  Dropdown: render(Antd.Dropdown),
  Menu: render(Antd.Menu),
  'Menu.SubMenu': render(Antd.Menu.SubMenu),
  Pagination: render(Antd.Pagination),
  PageHeader: render(Antd.PageHeader),
  Steps: render(Antd.Steps),
  //==================数据录入====================
  AutoComplete: render(Antd.AutoComplete),
  Checkbox: render(Antd.Checkbox),
  Cascader: render(Antd.Cascader),
  DatePicker: render(Antd.DatePicker),
  Form: render(Antd.Form),
  'Form.Item': render(Antd.Form.Item),
  InputNumber: render(Antd.InputNumber),
  Input: render(Antd.Input),
  'Input.TextArea': render(Antd.Input.TextArea),
  Mentions: render(Antd.Mentions),
  Rate: render(Antd.Rate),
  Radio: render(Antd.Radio),
  Switch: render(Antd.Switch),
  Slider: render(Antd.Slider),
  Select: render(Antd.Select),
  TreeSelect: render(Antd.TreeSelect),
  Transfer: render(Antd.Transfer),
  TimePicker: render(Antd.TimePicker),
  Upload: render(Antd.Upload),
  //==================数据展示====================
  Avatar: render(Antd.Avatar),
  Badge: render(Antd.Badge),
  Comment: render(Antd.Comment),
  Collapse: render(Antd.Collapse),
  Carousel: render(Antd.Carousel),
  Card: render(Antd.Card),
  Calendar: render(Antd.Calendar),
  Descriptions: render(Antd.Descriptions),
  Empty: render(Antd.Empty),
  List: render(Antd.List),
  'List.Item': render(Antd.List.Item),
  Popover: render(Antd.Popover),
  Statistic: render(Antd.Statistic),
  Tree: render(Antd.Tree),
  Tooltip: render(Antd.Tooltip),
  Timeline: render(Antd.Timeline),
  Tag: render(Antd.Tag),
  Tabs: render(Antd.Tabs),
  Table: render(Antd.Table),
  //==================反馈组件====================
  Alert: render(Antd.Alert),
  Drawer: render(Antd.Drawer),
  Modal: render(Antd.Modal),
  Progress: render(Antd.Progress),
  Popconfirm: render(Antd.Popconfirm),
  Result: render(Antd.Result),
  Spin: render(Antd.Spin),
  Skeleton: render(Antd.Skeleton),
  //==================其他====================
  Anchor: render(Antd.Anchor),
  BackTop: render(Antd.BackTop),
  Divider: render(Antd.Divider),
};

/**
 * 支持的操作类型
 * 操作类型需要支持以下几个类型
 * message, notification, modal, drawer, popconfirm , ajax ,link , copy ,close
 */
const supportActions: any = {
  message: ({ content, duration, type = 'info' }: IMessage) => {
    let fn = Antd.message[type];
    if (fn) {
      fn(content, duration);
    }
  },
  notification: ({ message, description, duration = 3, type = 'info' }: INotification) => {
    let fn = Antd.notification[type] as Function;
    if (fn) {
      fn({ message, description, duration });
    }
  },
  // 这里需要参考， amis dialog 如何实现的
  modal: ({ title }: any = {}) => {
    return (
      <Antd.Modal visible={true} title={title}>
        <h1>你好</h1>
      </Antd.Modal>
    );
  },
};

export default supportComps;
