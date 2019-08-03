import React from 'react';
import AmisRenderer from '@/components/AmisRenderer';
import { SchemaNode } from 'amis/lib/types';

export default function() {
  let dataStr: any = window.localStorage.getItem('/api/app/create');
  if (!dataStr || dataStr === 'undefined' || dataStr === 'null') {
    dataStr = '{}';
  }
  let appConfig = JSON.parse(dataStr);

  const format2AmisConfig = (config: IAppConfig) => {

    console.log(config);

    let mainComponents = (config.components && config.components.filter(item => item.main)) || [];
    mainComponents = mainComponents.map(item => {
      if (item.filter && item.filter.controls && item.filter.controls.length === 0) {
        delete item.filter;
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

  return <AmisRenderer schema={format2AmisConfig(appConfig)} />;
}
