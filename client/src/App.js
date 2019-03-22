import React, {Component} from 'react';

/* Module */
import {HashRouter, Route, Switch} from "react-router-dom";

/* Component */
import Main from "./Components/Main";
import SignIn from "./Components/SignIn";

/* Redux */
import {bindActionCreators} from "redux";
import {startGame} from "./Store/actions";
import connect from "react-redux/es/connect/connect";

class App extends Component {

    componentDidMount() {
        this.props.startGame()
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route path="/sign_in" component={SignIn}/>
                    <Route component=""/>
                </Switch>
            </HashRouter>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        start: state.start
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startGame: bindActionCreators(startGame, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);