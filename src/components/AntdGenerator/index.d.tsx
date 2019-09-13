// 属性名保持和 Antd 组件一致
interface IComp {
  ctype: string; // 组件类型, 避免和组件的属性 type 冲突，这里改成 ctype
  body?: IComp | IComp[] | string | undefined; // 组件子节点
  actionType?: string | 'modal' | 'drawer' | 'ajax' | 'link'; // 事件类型
  [propName: string]: any;
}

interface IMessage {
  type: 'success' | 'info' | 'error' | 'warn' | 'loading' | 'warning';
  content: string;
  duration?: number;
  onClose?: any;
}

interface INotification {
  type: 'success' | 'info' | 'error' | 'warn' | 'warning' | 'open' | 'close' | 'destroy';
  message?: any;
  description?: string;
  placement?: string;
  duration?: number;
  icon?: any;
  onClose?: Function;
  onClick?: Function;
}
