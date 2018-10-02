/**
 * @Author : Duanjl
 * @Date: 9/5/2018
 * @Last Modified by：Duanjl
 * @Last modified time： 9/5/2018
 **/
import React from 'react';
import { Spin } from 'antd';

export default function Loading(props) {
  const { isLoading, timedOut, pastDelay, error } = props;
  if (isLoading) {
    if (timedOut) {
      return <div>Loader timed out!</div>;
    }
    if (pastDelay) {
      return <Spin size="large" style={{ margin: '40%' }} />;
    }
    return null;
  }
  if (error) {
    console.log(error);
    return <div>Error! Component failed to load</div>;
  }
  return null;
}
