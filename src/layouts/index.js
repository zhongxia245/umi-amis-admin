import 'amis/lib/themes/default.css';
import { Component } from 'react';
import { Layout } from 'antd';
import SiderMenu from '@/components/SiderMenu/SiderMenu';
import { getMenuData } from '@/config/menu';
import logo from '@/assets/logo.svg';
import GlobalHeader from '@/components/GlobalHeader';

const { Content, Header } = Layout;

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menuData: [],
    };
  }

  async componentDidMount() {
    let menuData = await getMenuData();
    console.log(menuData);
    this.setState({ menuData });
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children, location } = this.props;
    const { collapsed, menuData } = this.state;
    return (
      <Layout>
        <SiderMenu
          logo={logo}
          collapsed={collapsed}
          menuData={menuData}
          location={location}
          onCollapse={this.handleMenuCollapse}
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
              onCollapse={this.handleMenuCollapse}
            />
          </Header>
          <Content style={{ margin: '15px 15px 0', height: '100%' }}>{children}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
