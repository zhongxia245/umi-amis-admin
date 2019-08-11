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

// 接口配置
interface IApi {
  name: string; // 接口名称
  path: string; // 接口地址
  method: string; // 接口类型
  remark?: string; // 接口类型
}

// 模块配置
interface IModule {
  title: string;
  name: string;
  enable: boolean;
  layout: string;
  type: string;
  apiName?: string;
  // crud配置专有
  columns?: any[];
  columns_operation?: any[];
  filter_controls?: any[];
  // form表单专有配置
  initApiName?: string;
  controls?: any[];
  // iframe 配置
  src?: string;
  height?: string;
}

interface IToolbar {
  label: string;
  moduleName: string;
}

// 应用配置
interface IAppConfig {
  _id?: string;
  title: string; // 应用名称
  group: string; // 应用分组
  service: string; // 应用服务
  subTitle: string; // 应用介绍
  status?: number; // 应用状态  prod ,dev
  version?: number; // 配置版本号, 后续版本迭代，可以根据版本号做老版本兼容
  apis: IApi[]; // 接口列表
  modules: IModule[]; // 模块列表
  toolbar_controls: IToolbar[];
}
