import React, { useEffect } from 'react';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { LoginScreen } from './../components/auth/LoginScreen';
import { GoalsRouter } from './GoalsRouter';
import { StartChecking } from './../actions/auth';

export const AppRouter = () => {
    
    const dispatch = useDispatch();
    const {uid} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(StartChecking());
    }, [dispatch])    

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" component={LoginScreen} isAuthenticated={!!uid} />
                    <PrivateRoute path="/" component={GoalsRouter} isAuthenticated={!!uid} />

                    <Redirect to="/auth" />
                </Switch>
            </div>
        </Router>
    )
}
