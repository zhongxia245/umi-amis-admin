import { getApp } from '@/api';
import { cloneDeep, groupBy, find } from 'lodash';

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path: string) {
  return reg.test(path);
}

const menuData = [
  {
    name: 'DashBoard',
    icon: 'dashboard',
    path: '/',
  },
  {
    name: '应用管理',
    icon: 'appstore',
    path: 'system/app',
    children: [
      {
        name: '创建应用',
        path: 'create',
      },
      {
        name: '应用列表',
        path: 'list',
      },
      {
        name: '分组列表',
        path: 'group',
      },
      {
        name: '服务列表',
        path: 'service',
      },
    ],
  },
  {
    name: '用户管理',
    icon: 'user',
    path: 'system/user',
    children: [
      {
        name: '用户列表',
        path: 'list',
      },
      {
        name: '新建用户',
        path: 'create',
      },
    ],
  },
];

function formatter(data: any[], parentPath: string = '/', parentAuthority?: any) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

// 获取动态菜单
const getDynamicMenu = async () => {
  let menus: any = [];

  let data: any = await getApp();

  // 根据应用进行分组
  let groups: any = groupBy(data, 'group._id');
  Object.keys(groups).map((key: string) => {
    if (groups[key] && groups[key].length > 0) {
      // 获取应用的名称
      let group = find(data, item => item.group._id === key) || {};
      let menu: any = {
        name: group.name,
        icon: 'hdd',
        path: `system/${key}`,
        children: [],
      };
      groups[key].map((item: any) => {
        menu.children.push({
          name: item.name,
          path: item._id,
        });
      });
      menus.push(menu);
    }
  });

  return menus;
};

export const getMenuData = async () => {
  let newMenuData = cloneDeep(menuData);
  let dynamicMenuData = await getDynamicMenu();
  return formatter([...newMenuData, ...dynamicMenuData]);
};
