import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {syncHistoryWithStore} from 'react-router-redux';
import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import store from './store';
import DataService from './services/data-service';
import {DataServiceProvider} from './components/data-service-context';
import {createBrowserHistory} from 'history';

const dataService = new DataService();
const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDom.render(<Provider store={store}>
    <ErrorBoundry>
        <DataServiceProvider value={dataService}>
            <Router history={history} >
                <App/>
            </Router>
        </DataServiceProvider>
    </ErrorBoundry>
</Provider>, document.getElementById('root'));