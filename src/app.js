import react from 'react';
import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PageLayout from './components/Containers/PageLayout/PageLayout';

import RouteGuard from './components/Private/RouteGuard/RouteGuard';

import UsersPage from './components/Pages/Users';
import DashboardPage from './components/Pages/Dashboard';
import ExchangesPage from './components/Pages/Exchanges';
import TradesPage from './components/Pages/Trades';
import MarketsPage from './components/Pages/Markets';
import SignInPage from './components/Pages/Signin';

const App = () => {
    return (
        <Router>
            <PageLayout>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />

                    <Route path="/exchanges" element={<ExchangesPage />} />
                    <Route path="/markets" element={<MarketsPage />} />
                    <Route path="/trades" element={<TradesPage />} />

                    <Route path="/users" element={
                        <RouteGuard redirect="/">
                            <UsersPage />
                        </RouteGuard>
                    } />
                    <Route path="/signin" element={<SignInPage />} />
                </Routes>
            </PageLayout>
        </Router>
    )
}

export default App;
