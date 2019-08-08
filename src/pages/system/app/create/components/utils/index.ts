// 包上一层 page 组件的配置
const withPageConfig = (data: any) => {
  return {
    type: 'page',
    title: data.title,
    subTitle: data.subtitle,
    aside: {}, // TODO:后续可以加上侧边栏
    body: data,
  };
};

export const getAMISConfig = (data: any) => {
  
  return withPageConfig(data);
};
