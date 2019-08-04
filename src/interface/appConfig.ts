// 接口
interface IApi {
  label: string; // 接口名称
  vlaue: string; // 接口标识
  host: string; // 接口域名
  path: string; // 接口地址
}

// 表格过滤项
interface IFilter {
  title: string;
  submitText: string;
  controls: Array<IFormItem>;
}

// 表单项
interface IFormItem {
  type: string;
  name: string;
  label: string;
}

// 自定义组件
interface IComponent {
  main: boolean; // 主体应用
  type: string; // 组件类型
  initaApi: string; // 初始化 API
  submitApi: string; // 提交 API
  filter: IFilter; // 【table】表格过滤
  columns: Array<IFormItem>; // 【table】表格字段
  controls: Array<IFormItem>; // 【form】表单字段
}

// 应用配置
interface IAppConfig {
  _id?: string;
  name: string; // 应用名称
  group_id: string; // 应用分组
  service_id: string; // 应用服务
  remark: string; // 应用介绍
  config: string;
  status?: number; // 应用状态  prod ,dev
  version?: number;
}
