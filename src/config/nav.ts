// 导航栏菜单
const Nav: Array<any> = [
  {
    label: '',
    children: [
      {
        path: '/',
        label: 'Dashboard',
        icon: 'fa fa-tachometer',
      },
      {
        label: '应用管理',
        icon: 'fa fa-wpforms',
        children: [
          {
            label: '创建应用',
            path: '/system/app/create',
          },
          {
            label: '应用列表',
            path: '/system/app/list',
          },
          {
            label: '应用分组',
            path: '/system/app/group',
          },
        ],
      },
      {
        label: '用户管理',
        icon: 'fa fa-user-o',
        children: [
          {
            label: '用户列表',
            path: '/system/user/list',
          },
        ],
      },
    ],
  },
];

export default Nav;
