import 'amis/lib/themes/default.css';

import React from 'react';
import Link from 'umi/link';
import { Layout, AsideNav } from 'amis';

import { Nav } from '../config';

const BasicLayout: React.FC = props => {
  let jsx = {
    renderLink: ({ link, active, toggleExpand, classnames: cx }: any) => {
      let children = [];

      if (link.children) {
        children.push(<span key="expand-toggle" className={cx('AsideNav-itemArrow')} />);
      }

      link.badge &&
        children.push(
          <b key="badge" className={cx(`AsideNav-itemBadge`, link.badgeClassName || 'bg-info')}>
            {link.badge}
          </b>,
        );

      if (link.icon) {
        children.push(<i key="icon" className={cx(`AsideNav-itemIcon`, link.icon)} />);
      }

      children.push(
        <span className={cx(`AsideNav-itemLabel`)} key="label">
          {link.label}
        </span>,
      );

      return link.path ? (
        <Link to={link.path[0] === '/' ? link.path : `/${link.path}`}>{children}</Link>
      ) : (
        <a onClick={link.children ? () => toggleExpand(link) : () => {}}>{children}</a>
      );
    },
    renderAside: () => {
      return (
        <AsideNav
          key="aside"
          navigations={Nav}
          renderLink={jsx.renderLink}
          isActive={action.handleActive}
        />
      );
    },

    renderHeader: () => {
      return (
        <header>
          <div className={`a-Layout-brandBar`}>
            <div className={`a-Layout-brand`}>
              <i className="fa fa-paw" />
              <span className="hidden-folded m-l-sm">Umi-Amis-Admin</span>
            </div>
          </div>
        </header>
      );
    },
  };

  let action = {
    isActive: (link: any, location: any) => {
      if (window.location.hash.indexOf('#') > -1) {
        return !!(link && `#${link}` === location.hash);
      } else {
        return !!(link && link === location.pathname);
      }
    },
    handleActive: (link: any) => {
      return action.isActive(
        link.path && link.path[0] === '/' ? link.path : `/${link.path}`,
        window.location,
      );
    },
  };

  return (
    <Layout header={jsx.renderHeader()} aside={jsx.renderAside()} asideFixed={true}>
      {props.children}
    </Layout>
  );
};

export default BasicLayout;
