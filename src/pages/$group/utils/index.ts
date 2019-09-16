import { compact, find, cloneDeep } from 'lodash';
import { API_HOST } from '@/config';

let temp_app_id: string = '';

// 包上一层 page 组件的配置
const withPageConfig = (data: any, body: any, toolbar?: any) => {
  return {
    type: 'page',
    title: data.title,
    subTitle: data.subTitle,
    body: body,
    toolbar: toolbar,
  };
};

// 获取接口地址
const getApiPath = (apis: any[], apiName: any, moduleConfig: any = {}) => {
  let api = find(apis, obj => obj.name === apiName) || {};

  // 如果不存在接口地址，则返回空
  if (api.path) {
    // 接口返回的数据可能不在 data 属性内，因此需要支持自定义一个
    let dataField = moduleConfig.dataField || 'data';

    console.log(api);

    return {
      url: `${API_HOST}/api/v1/proxy/${temp_app_id}/${api.name}/dev`,
      method: api.method,
      data: {},
      // 接口适配,处理不符合约定接口数据
      adaptor: (result: any) => {
        return {
          data: result[dataField],
          status: result.status === 0 || result.success ? 0 : 1,
          msg: result.msg || result.message,
        };
      },
    };
  } else {
    return '';
  }
};

/**
 * 获取表单的配置
 */
const getFormConfig = (moduleConfig: IModule, initConfig: IAppConfig) => {
  return {
    type: moduleConfig.type,
    name: moduleConfig.name,
    title: moduleConfig.title,
    api: getApiPath(initConfig.apis, moduleConfig.apiName, moduleConfig),
    // form config
    initApi: getApiPath(initConfig.apis, moduleConfig.initApiName, moduleConfig),
    controls: moduleConfig.controls,
  };
};

/**
 * 获取 IFrame 的配置
 */
const getIFrameConfig = (moduleConfig: IModule, initConfig: any) => {
  return {
    type: moduleConfig.type,
    name: moduleConfig.name,
    title: moduleConfig.title,
    src: moduleConfig.src,
    height: moduleConfig.height,
  };
};

/**
 * 获取表格模块配置
 */
const getTableConfig = (moduleItem: IModule, initConfig: any) => {
  let amisModule: any = {
    type: moduleItem.type,
    name: moduleItem.name,
    title: moduleItem.title,
    api: getApiPath(initConfig.apis, moduleItem.apiName, moduleItem),
    columns: [],
  };

  // 增加操作列
  amisModule.columns =
    moduleItem.columns && moduleItem.columns.filter((item: any) => item.type !== 'operation');
  if (moduleItem.columnsOperation) {
    let buttons: any[] = [];
    moduleItem.columnsOperation.map((item: any) => {
      if (item.moduleName) {
        let moduleConfig = getModuleConfig(initConfig, item.moduleName);
        // 表格操作列,先默认使用弹窗的模式
        item['actionType'] = 'dialog';
        item['dialog'] = {
          size: 'md',
          closeOnEsc: true,
          title: item.label,
          body: moduleConfig,
        };
      }
      buttons.push(item);
    });

    amisModule.columns.push({
      type: 'operation',
      label: '操作',
      width: buttons.length * 50,
      buttons: buttons,
    });
  }

  // 表格过滤条件
  if (moduleItem.filterControls && moduleItem.filterControls.length > 0) {
    // 搜索按钮默认放在最后一个搜索字段
    moduleItem.filterControls[moduleItem.filterControls.length - 1].addOn = {
      label: '搜索',
      type: 'submit',
    };

    amisModule.filter = {
      title: '条件过滤',
      submitText: '',
      controls: moduleItem.filterControls || [],
    };
  }

  return amisModule;
};

/**
 * 获取表单模块的配置
 */
const getModuleConfig = (initConfig: IAppConfig, moduleName: string) => {
  let moduleConfig: IModule | undefined = find(initConfig.modules, obj => {
    return obj.name === moduleName;
  });

  if (!moduleConfig) return {};

  switch (moduleConfig.type) {
    case 'form':
      return getFormConfig(moduleConfig, initConfig);
    case 'crud':
      return getTableConfig(moduleConfig, initConfig);
    case 'iframe':
      return getIFrameConfig(moduleConfig, initConfig);
    default:
      return {};
  }
};

/**
 * 处理模块的配置
 */
const gerneratorAmisConfig = (initConfig: IAppConfig) => {
  const config = cloneDeep(initConfig);
  let body: any[] = [];

  // 不存在模块则直接返回
  if (!config.modules || config.modules.length === 0) {
    return body;
  }

  // 过滤掉交互弹出的组件， 比如弹窗，侧边栏
  // 这里只展示打开页面展示的组件
  config.modules = config.modules.filter(item => item.layout === '');

  config.modules &&
    config.modules.map((moduleItem: IModule) => {
      // 为空列表设置默认值
      moduleItem.columns = compact(moduleItem.columns) || [];
      moduleItem.columnsOperation = compact(moduleItem.columnsOperation) || [];
      moduleItem.filterControls = compact(moduleItem.filterControls) || [];
      moduleItem.controls = compact(moduleItem.controls) || [];

      // 获取AMIS模块配置
      let amisModule = getModuleConfig(initConfig, moduleItem.name);

      // 移除没有赋值的属性
      for (const key in amisModule) {
        if (amisModule.hasOwnProperty(key) && amisModule[key] === undefined) {
          delete amisModule[key];
        }
      }

      body.push(amisModule);
    });

  return body;
};

/**
 * 获取页面工具栏按钮(右上角工具栏)
 */
const getToolbarConfig = (config: IAppConfig) => {
  let toolbar: any[] = [];
  if (config.toolbarControls && config.toolbarControls.length > 0) {
    config.toolbarControls.map((item: IToolbar) => {
      let moduleConfig = getModuleConfig(config, item.moduleName);

      // NOTE：目前默认按钮形式，点击是弹窗的模式
      toolbar.push({
        type: 'button',
        level: 'primary',
        label: item.label,
        actionType: 'dialog',
        dialog: {
          size: 'md',
          closeOnEsc: true,
          title: item.label,
          body: moduleConfig,
        },
      });
    });
  }
  return toolbar;
};

/**
 * 生成 AMIS 的配置文件
 */
export const getAMISConfig = (data: any) => {
  // 缓存起来，给其他函数用
  temp_app_id = data._id;

  let config: IAppConfig = JSON.parse(data.config);
  let toolbar = getToolbarConfig(config);
  let body = gerneratorAmisConfig(config);
  return withPageConfig(config, body, toolbar);
};
