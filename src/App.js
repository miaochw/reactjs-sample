import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './pages/Layout';
import routes from './routes';
import PageHeader from './component/PageHeader';

function App() {
  return (
    <BrowserRouter>
      <div style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <Switch>
            {routes.map(route => (
              <Route
                {...route}
                key={route.name}
                render={props => (route.loadComponent ? (
                  <PageHeader {...props} name={route.name}>
                    {React.createElement(route.loadComponent, props)}
                  </PageHeader>
                ) : null)
                }
              />
            ))}
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
