import React, { Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Page from '@demo/components/Page';
import store from '@demo/store';
import '@demo/styles/common.scss';
import { history } from './utils/history';
// import Home from '@demo/pages/Home';

const Editor = React.lazy(() => import('@demo/pages/Editor'));

function App() {
  return (
    //Provider 解决组件中的数据传输，
    <Provider store={store}>
      <Page>
        <Suspense
          fallback={
            <div
              style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                width='150px'
                src='/images/Fj1gmWbF-aY3ZnPyrTrDge6atRnm.svg'
                alt=''
              />
              <p
                style={{
                  fontSize: 24,
                  color: 'rgba(0, 0, 0, 0.65)',
                }}
              >
                Please wait a moment.
              </p>
            </div>
          }
        >
          <Router history={history}>
            <Switch>
              <Route path='/' exact component={Editor} />
              {/* <Route path='/' exact component={Home} />
              <Route path='/editor' exact component={Editor} /> */}
            </Switch>
          </Router>
        </Suspense>
      </Page>
    </Provider>
  );
}

export default App;
