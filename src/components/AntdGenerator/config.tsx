import React from 'react';
import { Card, Table, Input, Button, Icon, Typography, Row, Col, Layout } from 'antd';

const { Paragraph } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const render = (Comp: any) => (props: object) => <Comp {...props} />;
const renderWithChildren = (Comp: any) => ({ children, ...otherProps }: any) => (
  <Comp {...otherProps}>{children}</Comp>
);

/**
 * 支持的组件类型
 * 如果是 Antd 基本组件，直接组装下返回
 * 如果是自定义组件，则需要自己编写实现
 */
const supportComps: any = {
  //==================通用====================
  button: renderWithChildren(Button),
  icon: render(Icon),
  paragraph: renderWithChildren(Paragraph),
  //==================布局====================
  row: renderWithChildren(Row),
  col: renderWithChildren(Col),
  layout: renderWithChildren(Layout),
  header: renderWithChildren(Header),
  footer: renderWithChildren(Footer),
  sider: renderWithChildren(Sider),
  content: renderWithChildren(Content),
  // 卡片
  card: renderWithChildren(Card),
  // 表格
  table: render(Table),
  // 文本框
  input: render(Input),
};

export default supportComps;
