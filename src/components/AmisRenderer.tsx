import { render as renderSchema } from 'amis';
import Axios from 'axios';
import router from 'umi/router';
import { SchemaNode } from 'amis/lib/types';

const defaultOptions: object = {
  fetcher: ({
    url,
    method,
    data,
  }: {
    url: string /*目标地址*/;
    method: 'get' | 'post' | 'put' | 'delete' /*发送方式*/;
    data: object | void /*数据*/;
    config: object /*其他配置*/;
  }) => {
    // 用来发送 Ajax 请求，建议使用 axios

    console.log(`[API]:${method}:${url}`, data);

    switch (method) {
      case 'get':
        return Axios.get(url);
      case 'post':
        return Axios.post(url, data);
      case 'delete':
        return Axios.delete(url);
      case 'put':
        return Axios.put(url, data);
      default:
        return Axios.get(url);
    }
  },
  notify: (type: 'error' | 'success' /**/, msg: string /*提示内容*/) => {
    // 用来提示用户
    console.log(`[notify]:${type}==>${msg}`);
  },
  alert: (content: string /*提示信息*/) => {
    // 另外一种提示，可以直接用系统框
    console.log(`[alert]:${content}`);
  },

  jumpTo: (url: string) => {
    // 可以不传，用来实现页面跳转
    router.push(url);
  },

  updateLocation: () => {
    // 可以不传，用来实现地址栏更新
  },

  isCurrentUrl: () => {
    // 可以不传，用来判断是否目标地址当前地址。
  },

  copy: () => {
    // 可以不传，用来实现复制到剪切板
  },

  confirm: (msg: string) => {
    return confirm(msg);
    // 可以不传，用来实现确认框。
  },
};

export default ({ schema }: { schema: SchemaNode }) => {
  return renderSchema(schema, {}, defaultOptions);
};
