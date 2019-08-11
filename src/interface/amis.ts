// 弹窗
interface IAMISDialogOrDrawer {
  title: string;
  closeOnEsc: boolean;
  actions: any[];
  body?: IAMISBody | IAMISBody[];
}

// body 配置
interface IAMISBody {
  type: string;
  title: string;
  subTitle?: string;
  remark?: string;
  body: any;
  aside?: any;
  toolbar?: any;
  initApi?: string;
}

// 表单配置
interface IAMISForm {
  type: 'form';
  title?: string;
  api?: string;
  initApi?: string;
  controls?: IAMISFormItem[];
}

// 表单项配置
interface IAMISFormItem {
  type: string;
  label?: string;
  name?: string;
}

// 表格字段项
interface IAMISTableColumn {
  type: string; // 字段类型
  name: string; // 字段表示
  label?: string; // 字段名称
  width?: string;
  actionType?: string;
  dialog?: IAMISDialogOrDrawer;
  drawer?: IAMISDialogOrDrawer;
}
