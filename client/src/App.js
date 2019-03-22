import React, {Component} from 'react';

/* Module */
import {HashRouter, Route, Switch} from "react-router-dom";

/* Component */
import Main from "./Components/Main";
import SignIn from "./Components/SignIn";
import Modal from "./Components/Modal";
import Table from "./Components/Table";

class App extends Component {

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route path="/sign_in" component={SignIn}/>
                    <Route path="/table" component={Table}/>
                    <Route component=""/>
                </Switch>
                <Modal/>
            </HashRouter>
        );
    }
}

export default App;