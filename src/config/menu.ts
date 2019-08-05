/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path: string) {
  return reg.test(path);
}

const menuData = [
  {
    name: 'DashBoard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '工作台',
        path: '/',
      },
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
    ],
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

export const getMenuData = () => formatter(menuData);
