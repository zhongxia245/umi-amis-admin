import 'amis/lib/themes/default.css';
import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import SiderMenu from '@/components/SiderMenu/SiderMenu';
import { getMenuData } from '@/config/menu';
import logo from '@/assets/logo.svg';
import GlobalHeader from '@/components/GlobalHeader';
import { AppContextProvider } from '../store';

const { Content, Header } = Layout;

const BasicLayout = ({ children, location }) => {
  const [state, setState] = useState({ collapsed: false, menuData: [] });
  const { collapsed, menuData } = state;

  const refreshMenus = async () => {
    let menuData = await getMenuData();
    setState({ menuData });
  };

  const handleMenuCollapse = () => {
    setState({ collapsed: !collapsed });
  };

  useEffect(() => {
    refreshMenus();
  }, []);

  return (
    <AppContextProvider initState={{ refreshMenus }}>
      <Layout>
        <SiderMenu
          logo={logo}
          collapsed={collapsed}
          menuData={menuData}
          location={location}
          onCollapse={handleMenuCollapse}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              logo={logo}
              collapsed={collapsed}
              currentUser={{
                name: 'Serati Ma',
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                userid: '00000001',
                notifyCount: 12,
              }}
              onCollapse={handleMenuCollapse}
            />
          </Header>
          <Content style={{ margin: '15px 15px 0', height: '100%' }}>{children}</Content>
        </Layout>
      </Layout>
    </AppContextProvider>
  );
};

export default BasicLayout;
