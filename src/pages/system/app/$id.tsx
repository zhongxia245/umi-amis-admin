import React, { useEffect, useState } from 'react';
import AmisRenderer from '@/components/AmisRenderer';
import { SchemaNode } from 'amis/lib/types';
import { withRouter } from 'umi';
import { getAppById } from '@/api';
import { message } from 'antd';

export default withRouter(({ match }) => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    const getConfig = async () => {
      let data: any = await getAppById(match.params.id);
      if (data._id) {
        let appConfig = JSON.parse(data.config);
        setConfig(appConfig);
      } else {
        message.error(`应用 ID(${match.params.id}) 不存在`);
      }
    };
    getConfig();
  }, []);

  const format2AmisConfig = (config: any) => {
    console.log(config);

    let mainComponents =
      (config.components && config.components.filter((item: any) => item.main)) || [];

    mainComponents = mainComponents.map((item: any) => {
      if (item.filter && item.filter.controls && item.filter.controls.length === 0) {
        delete item.filter;
      }
      if (item.type === 'form') {
        item.mode = 'horizontal';
        item.horizontal = {
          left: 'col-sm-2',
          right: 'col-sm-4',
          offset: 'col-sm-offset-2',
        };
      }
      return item;
    });

    console.log(mainComponents);

    const schema: SchemaNode = {
      type: 'page',
      title: config.name,
      subtitle: config.desc,
      body: mainComponents,
    };
    return schema;
  };

  return <AmisRenderer schema={format2AmisConfig(config)} />;
});
