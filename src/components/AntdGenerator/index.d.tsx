// 属性名保持和 Antd 组件一致
interface IComp {
  ctype: string; // 组件类型, 避免和组件的属性 type 冲突，这里改成 cType
  body?: IComp | IComp[] | string | undefined; // 组件子节点
  [propName: string]: any;
}
