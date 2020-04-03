import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignIn from './Components/auth/SignIn';
import AnalystDashboard from './Components/dashboard/AnalystDashboard';
import AdminDashboard from './Components/dashboard/AdminDashboard';
import Dashboard from './Components/dashboard/Dashboard';
import Register from './Components/auth/Register';
import Wallet from './Components/dashboard/Wallet';
import Profile from './Components/auth/Profile';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/dashboard" component = {Dashboard} />
                    <Route exact path="/wallet" component = {Wallet} />
                    <Route exact path="/adminDashboard" component = {AdminDashboard} />
                    <Route exact path="/analystDashboard" component = {AnalystDashboard} />
                    <Route exact path="/" component = {SignIn} />
                    <Route exact path="/register" component = {Register} />
                    <Route exact path="/profile" component = {Profile} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App
