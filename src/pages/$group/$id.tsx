/**
 * AMIS 应用渲染组件
 * 保存的 JSON 配置，即按照 AMIS 的 JSON 格式来的，因此这里只需要拿到配置，展示出来即可
 */
import React, { useEffect, useState } from 'react';
import AmisRenderer from '@/components/AmisRenderer';
import { withRouter } from 'umi';
import { getAppById } from '@/api';
import { message } from 'antd';
import { getAMISConfig } from './utils';

export default withRouter(({ match }) => {
  const [loading, setLoading]: any = useState(false);
  const [config, setConfig]: any = useState({});

  // 地址变动，则重新获取应用数据
  useEffect(() => {
    setLoading(true);
    const getConfig = async () => {
      let data: any = (await getAppById(match.params.id)) || {};
      if (data._id) {
        let amisConfig = getAMISConfig(data);
        console.log(amisConfig);
        setLoading(false);
        setConfig(amisConfig);
      } else {
        message.error(`应用 ID(${match.params.id}) 不存在`);
      }
    };
    getConfig();
  }, [match.url]);

  // BUGFIX： loading 是为了解决应用数据没更新的问题
  return loading ? <p>loading...</p> : <AmisRenderer schema={config} />;
});
