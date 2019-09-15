interface DSL {
  type: string;
  title: string;
  subTitle?: string;
  api?: string;
  initApi?: string;
  toolbar?: object;
  remark?: string;
  children?: DSL | DSL[];
}
