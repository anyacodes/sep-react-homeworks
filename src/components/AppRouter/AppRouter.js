import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Search from '../Search';
import ShowPage from '../ShowPage';
import './AppRouter.css';

class AppRouter extends Component {
    render() {
        return (
            <div className='App'>
                <Switch>
                    <Route path='/' component={Search} exact />
                    <Route path='/shows/:id' component={ShowPage} />
                    <Redirect to='*' />
                </Switch>
            </div>
        );
    }
}

export default withRouter(AppRouter);