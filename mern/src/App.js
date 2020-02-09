import React, { Component } from 'react';
import LandingPage from './Pages/LandingPage';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import CreateNote from './Pages/CreateNote';
import { ProtectedRoute } from './components/ProtectedRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


export default class App extends Component {

    render() {
        return (
            <Router className="App">
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/SignUp" component={SignUp} />
                    <ProtectedRoute path="/home" component={Home} />
                    <ProtectedRoute path="/createNote" component={CreateNote} />
                    <Route path="*" component={() => "404 NOT FOUND"} />
                </Switch>
            </Router>
        );
    }
}
