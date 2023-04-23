import react from 'react';
import { Routes, Route, useRoutes, Outlet, useParams } from 'react-router-dom';

import { store } from './store/configureStore';
import { Provider } from 'react-redux';

import PageLayout from './components/Containers/PageLayout/PageLayout';

import * as Page from './pages';
import * as PrivatePage from './pages/private';

import RouteGuard from './components/Private/RouteGuard/RouteGuard';
import WsController from './components/WebSocket/WsController';

import './styles.css';

const routes = [
    // public parts:
    { path: '/', element: <Page.Home /> },
    { path: '/exchanges', element: <Page.Exchanges /> },
    { path: '/markets', element: <Page.Markets /> },
    { path: '/trades', element: <Page.Trades /> },
    { path: '/coins', element: <Page.Coins /> },
    // public technical pages:
    { path: '/activation/:code', element: <Page.Activation /> },
    // private pages:
    { path: '/board', element: <RouteGuard redirect="/" component={<PrivatePage.Dashboard />} /> },
    { path: '/users', element: <RouteGuard redirect="/" component={<PrivatePage.Users />} /> }
];

const PageComponent = () => useRoutes(routes);

const App = () => <Provider store={store}>
    <WsController />
    <PageLayout>
        <PageComponent />
    </PageLayout>
</Provider>

const Test = () => {
    let {id} = useParams();
    return <>test {id}</>
}

export default App;
