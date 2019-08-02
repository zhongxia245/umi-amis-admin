import mockjs from 'mockjs';

export default {
  // 获取用户列表
  'GET /api/user/list': mockjs.mock({
    status: 0,
    msg: 'ok',
    data: {
      count: 100,
      'rows|10': [{ 'id|+1': 1, name: '@name', 'group|1-100': 50, 'status|0-2': 1 }],
    },
  }),
};
