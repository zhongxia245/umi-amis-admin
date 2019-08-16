import React from 'react';
import Gererator from './Generator';

const CONFIG: IComp = {
  ctype: 'layout',
  title: '布局',
  body: [
    { ctype: 'header', body: 'header' },
    {
      ctype: 'layout',
      body: [
        { ctype: 'sider', collapsed: true, theme: 'light', body: 'Sider' },
        {
          ctype: 'content',
          body: [
            {
              ctype: 'card',
              title: '子标题',
              body: {
                ctype: 'card',
                title: '子标题-子标题',
                body: [
                  { ctype: 'input', placeholder: '请输入用户名' },
                  { ctype: 'input', placeholder: '请输入用户名' },
                  { ctype: 'input', placeholder: '请输入用户名' },
                ],
              },
            },
            {
              ctype: 'table',
              size: 'middle',
              bordered: true,
              columns: [
                {
                  title: 'ID',
                  dataIndex: 'key',
                },
                {
                  title: '用户名',
                  dataIndex: 'name',
                },
                {
                  title: '年龄',
                  dataIndex: 'age',
                },
                {
                  title: '地址',
                  dataIndex: 'address',
                },
                {
                  title: '操作',
                  render: () => {
                    return <a>编辑</a>;
                  },
                },
              ],
              dataSource: [
                {
                  key: '1',
                  name: 'Mike',
                  age: 32,
                  address: '10 Downing Street',
                },
                {
                  key: '2',
                  name: 'John',
                  age: 42,
                  address: '10 Downing Street',
                },
              ],
            },
            { ctype: 'button', body: '子标题22', type: 'primary' },
          ],
        },
      ],
    },
    { ctype: 'footer', body: 'footer' },
  ],
};

export const AntdGenerator = () => {
  const renderComp = (compConfig: IComp, index?: number) => {
    const { body, ...otherProps } = compConfig;
    if (Array.isArray(body)) {
      // body 为数组,遍历渲染 body 下的组件
      return (
        <Gererator key={index} {...otherProps}>
          {body.map((item, index) => {
            return renderComp(item, index);
          })}
        </Gererator>
      );
    } else if (typeof body === 'object') {
      // body 为对象，渲染该 body 组件
      return (
        <Gererator key={index} {...otherProps}>
          {renderComp(body)}
        </Gererator>
      );
    } else if (body) {
      // body 为字符串，则把 body放到组件的节点内
      // eg： <Button>body</Button>
      return (
        <Gererator key={index} {...otherProps}>
          {body}
        </Gererator>
      );
    } else {
      // body 为空，则渲染组件，加上属性
      // eg: <Icon type="user" /> 不需要 body 属性
      return <Gererator key={index} {...otherProps} />;
    }
  };
  return renderComp(CONFIG);
};
