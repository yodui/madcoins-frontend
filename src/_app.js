import react, { useRef, useEffect } from 'react';
import './styles.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, useRoutes, Outlet } from 'react-router-dom';

import { store } from './store/configureStore';
import { Provider } from 'react-redux';

import PageLayout from './components/Containers/PageLayout/PageLayout';

import RouteGuard from './components/Private/RouteGuard/RouteGuard';

import UsersPage from './pages/Users';
import MainPage from './pages/MainPage';
import ExchangesPage from './pages/Exchanges';
import TradesPage from './pages/Trades';
import MarketsPage from './pages/Markets';
import DashboardPage from './pages/Dashboard';
import SignInPage from './pages/Signin';

import WsController from './components/WebSocket/WsController';


const routes = [
    { path: '/', element: <>Main page</> },
    { path: 'exchanges', element: <>Exchanges</> },
    { path: 'markets', element: <MarketsPage /> },
    { path: 'trades', element: <TradesPage /> },
    { path: 'activation', element: <ActivationPage />, children: [
        {
            path: '',
            element: <div>Empty params</div>
        }, {
            path: ':id',
            element: <div>Actication details</div>
        }
    ]}
];

const _app = () => {

    return (
        <Provider store={store}>
            <WsController />
        </Provider>
    )
}

/*<Router>

                    <Routes>
                        <Route exact path="/" element={<MainPage />} />

                        <Route path="/exchanges" element=<ExchangesPage /> />
                        <Route path="/markets" element=<MarketsPage /> />
                        <Route path="/trades" element=<TradesPage /> />

                        <Route path="/board" element=<DashboardPage /> />
                        <Route path="/users" element={
                            <RouteGuard redirect="/">
                                <UsersPage />
                            </RouteGuard>
                        } />
                        <Route path="/signin" element=<SignInPage /> />
                        <Route path="/activation/:code" element=<ActivationPage /> />
                    </Routes>
                </PageLayout>
            </Router>*/

const ActivationPage = () => {
    return <>Activation page</>
}

export default App;
