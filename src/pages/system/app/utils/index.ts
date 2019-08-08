import { compact, find, cloneDeep } from 'lodash';

// 包上一层 page 组件的配置
const withPageConfig = (data: any, body: any) => {
  return {
    type: 'page',
    title: data.title,
    subTitle: data.subTitle,
    body: body,
  };
};

/**
 * 获取模块配置
 */
const getModuleConfig = (modules: any[], item: any) => {
  let moduleConfig = find(modules, obj => {
    return obj.name === item.moduleName;
  });
  return moduleConfig;
};

/**
 * 处理模块的配置
 */
const gerneratorAmisConfig = (initData: IAppConfig) => {
  const data = cloneDeep(initData);
  let body: any[] = [];

  // 过滤掉交互弹出的组件， 比如弹窗，侧边栏
  // 这里只展示打开页面展示的组件
  data.modules = data.modules.filter(item => item.layout === '');

  data.modules &&
    data.modules.map((moduleItem: IModule) => {
      let amisModule: any = {
        type: moduleItem.type,
        name: moduleItem.name,
        title: moduleItem.title,
        api: moduleItem.api,
        // table config
        columns: [],

        // form config
        initApi: moduleItem.initApi,
        controls: moduleItem.controls,

        // iframe config
        src: moduleItem.src,
        height: moduleItem.height,
      };

      // 清除空列表
      moduleItem.columns = compact(moduleItem.columns) || [];
      moduleItem.columns_operation = compact(moduleItem.columns_operation) || [];
      moduleItem.filter_controls = compact(moduleItem.filter_controls) || [];
      moduleItem.controls = compact(moduleItem.controls) || [];

      // ================== TABLE =====================
      // 增加操作列
      amisModule.columns = moduleItem.columns.filter((item: any) => item.type !== 'operation');
      if (moduleItem.columns_operation) {
        let buttons: any[] = [];
        moduleItem.columns_operation.map((item: any) => {
          if (item.moduleName) {
            let moduleConfig = getModuleConfig(initData.modules, item);
            // 表格操作列,先默认使用弹窗的模式
            item['dialog'] = {
              title: item.label,
              body: moduleConfig,
            };
          }
          buttons.push(item);
        });

        amisModule.columns.push({
          type: 'operation',
          label: '操作',
          buttons: buttons,
        });
      }

      // 表格过滤条件
      if (moduleItem.filter_controls && moduleItem.filter_controls.length > 0) {
        // 搜索按钮默认放在最后一个搜索字段
        moduleItem.filter_controls[moduleItem.filter_controls.length - 1].addOn = {
          label: '搜索',
          type: 'submit',
        };

        amisModule.filter = {
          title: '条件过滤',
          submitText: '',
          controls: moduleItem.filter_controls || [],
        };
      }

      body.push(amisModule);
    });

  return body;
};

/**
 * 生成 AMIS 的配置文件
 */
export const getAMISConfig = (data: IAppConfig) => {
  let body = gerneratorAmisConfig(data);
  return withPageConfig(data, body);
};
