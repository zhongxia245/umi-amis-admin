import { getMenuData } from './menu';

// 支持的组件类型
// 目前没有把 AMIS 全部接入
// 所有表单类型，参考这个 https://baidu.github.io/amis/form/full
const CONTROLS_FORM_TYPES = [
  { label: '文本框', value: 'text' },
  { label: '多行文本', value: 'textarea' },
  { label: '下拉框', value: 'select' },
  { label: '日期', value: 'date' },
  { label: '时间', value: 'time' },
  { label: '日期+时间', value: 'datetime' },
  { label: '时间范围', value: 'date-range' },
  { label: '单选框', value: 'radios', options: [], inline: true },
  { label: '多选框', value: 'checkboxes', options: [], inline: true },
  { label: '开关', value: 'switch' },
  { label: '图片', value: 'image' },
  { label: '颜色', value: 'color' },
  { label: '数字文本框', value: 'number' },
  { label: '分割线', value: 'divider' },
  { label: 'HTML', value: 'html' },
  { label: '评分', value: 'rating' },
  { label: '城市', value: 'city' },
  { label: '文件上传', value: 'file' },
];

export { getMenuData, CONTROLS_FORM_TYPES };
