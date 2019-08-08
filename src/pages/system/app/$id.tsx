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
  const [config, setConfig]: any = useState({});

  useEffect(() => {
    const getConfig = async () => {
      let data: any = (await getAppById(match.params.id)) || {};
      if (data._id) {
        let config = JSON.parse(data.config);
        let amisConfig = getAMISConfig(config);
        console.log(amisConfig);
        setConfig(amisConfig);
      } else {
        message.error(`应用 ID(${match.params.id}) 不存在`);
      }
    };
    getConfig();
  }, []);
  return <AmisRenderer schema={config} />;
});
