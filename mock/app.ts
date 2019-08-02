import mockjs from 'mockjs';

export default {
  // 获取应用列表
  'GET /api/app/list': mockjs.mock({
    status: 0,
    msg: 'ok',
    data: {
      count: 100,
      'rows|10': [
        { 'id|+1': 1, name: '@name', 'group|1-100': 50, 'status|0-2': 1, remark: '@city' },
      ],
    },
  }),
  // 创建应用
  'POST /api/app/create': mockjs.mock({
    status: 0,
    msg: 'ok',
    data: true,
  }),
  // 更新
  'POST /api/app/:id': mockjs.mock({
    status: 0,
    msg: 'ok',
    data: true,
  }),
};
