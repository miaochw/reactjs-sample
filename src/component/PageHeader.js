/**
 * @Author : Duanjl
 * @Date: 9/10/2018
 * @Last Modified by：Duanjl
 * @Last modified time： 9/10/2018
 **/
import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
// import MyRoute from '../routes';
import { myPaths } from '../routes';

export default function PageHeader(props) {
  console.log(props);
  const { children } = props;
  function itemRender(route, params, routes, paths) {
    console.log(route, params, routes, paths);
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.name}</span>
    ) : (
      <Link to={paths.join('/')}>{route.name}</Link>
    );
  }
  return (
    <div className="page">
      <div className="page-head">
        <Breadcrumb itemRender={itemRender} routes={myPaths} />
      </div>
      <div className="page-body">{children}</div>
    </div>
  );
}
