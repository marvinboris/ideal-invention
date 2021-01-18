import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

// Common routes
const asyncHome = asyncComponent(() => import('./containers/Home/Index'));
const asyncType = asyncComponent(() => import('./containers/Type'));
const asyncTeams = asyncComponent(() => import('./containers/Teams'));
const asyncPlayers = asyncComponent(() => import('./containers/Players'));
const asyncGame = asyncComponent(() => import('./containers/Game'));

class App extends Component {
    render() {
        let routes = (
            <Switch>
                <Route path="/game" component={asyncGame} />
                <Route path="/players" component={asyncPlayers} />
                <Route path="/teams" component={asyncTeams} />
                <Route path="/type" component={asyncType} />
                <Route path="/" component={asyncHome} />
            </Switch>
        );

        return <Layout>
            {routes}
        </Layout>;
    }
}

export default withRouter(App);
