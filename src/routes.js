/**
 * @Author : Duanjl
 * @Date: 9/4/2018
 * @Last Modified by：Duanjl
 * @Last modified time： 9/4/2018
 **/
import Loadable from 'react-loadable';
import Loading from './component/loading';
// import Home from './pages/Home/Home';

export const myPaths = [
  {
    path: '/home',
    exact: true,
    name: 'Home',
    loadComponent: 'Home/Home',
  },
  {
    path: '/content',
    exact: true,
    name: '内容列表',
    loadComponent: 'Content/Content',
  },
  {
    path: '/content/:id',
    name: '内容详情',
    loadComponent: 'Content/ContentItem',
  },
];

const routes = () => myPaths.map((route) => {
  if (route.loadComponent) {
    const pathArr = route.loadComponent.split('/');
    const property = pathArr[pathArr.length - 1];
    const component = Loadable({
      loader: () => import(`./pages/${route.loadComponent}.js`),
      loading: Loading,
      delay: 0,
      timeout: 10000,
    });
    return {
      ...route,
      name: route.name ? route.name : property,
      path: route.path,
      loadComponent: component,
    };
  }
  return { ...route };
});
export default routes();
