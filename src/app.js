import react from 'react';
import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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


const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <PageLayout>
                    <Routes>
                        <Route path="/" element={<MainPage />} />

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
                    </Routes>
                </PageLayout>
            </Router>
        </Provider>
    )
}

export default App;
