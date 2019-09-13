import React from 'react';
import Gererator from './Generator';
import { AppContextProvider } from './store';

const CONFIG: IComp = {
  ctype: 'Card',
  title: '布局',
  body: [
    {
      ctype: 'Button',
      type: 'primary',
      body: 'Click Me',
      actionType: 'message',
      message: {
        type: 'loading',
        content: '点击我拉',
        duration: 2,
      },
      style: {
        marginRight: 10,
      },
    },
    {
      ctype: 'Button',
      type: 'primary',
      body: 'Click Me',
      actionType: 'notification',
      notification: {
        type: 'error',
        message: '温馨提示',
        description: '你好，欢迎来到 xxxx',
        duration: 2,
      },
      style: {
        marginRight: 10,
      },
    },
    {
      ctype: 'Button',
      type: 'primary',
      body: 'Click Me',
      actionType: 'modal',
      modal: {
        title: '温馨提示',
      },
    },
    {
      ctype: 'Divider',
    },
    {
      ctype: 'Form',
      layout: 'inline',
      body: [
        {
          ctype: 'Form.Item',
          label: '用户名',
          body: {
            ctype: 'Input',
            type: 'text',
            placeholder: 'Click Me',
          },
        },
        {
          ctype: 'Form.Item',
          label: '密码',
          body: {
            ctype: 'Input',
            type: 'text',
            placeholder: 'Click Me',
          },
        },
        {
          ctype: 'Form.Item',
          label: '外号',
          body: {
            ctype: 'Input',
            type: 'text',
            placeholder: 'Click Me',
          },
        },
        {
          ctype: 'Form.Item',
          label: '昵称',
          body: {
            ctype: 'Input',
            type: 'text',
            placeholder: 'Click Me',
          },
        },
        {
          ctype: 'Divider',
        },
        {
          ctype: 'Button',
          type: 'primary',
          body: '重置',
          style: {
            marginRight: '10px',
          },
        },
      ],
    },
  ],
};

/**
 * 组件生成器
 */
const AntdGenerator = () => {
  const renderComp = (compConfig: IComp, index?: number) => {
    const { body, ...otherProps } = compConfig;
    if (Array.isArray(body)) {
      // body 为数组,遍历渲染 body 下的组件
      // eg: 类如表单列表
      // <Form>
      //   <FormItem></FormItem>
      //   <FormItem></FormItem>
      //   <FormItem></FormItem>
      //  </Form>
      return (
        <Gererator key={index} {...otherProps}>
          {body.map((item, i) => {
            return renderComp(item, i);
          })}
        </Gererator>
      );
    } else if (typeof body === 'object') {
      // body 为对象，渲染该 body 组件
      // eg <Row> <Col> content </Col> </Row>
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

export default () => {
  return (
    <AppContextProvider>
      <AntdGenerator />
    </AppContextProvider>
  );
};
