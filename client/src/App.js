import React, {Component} from 'react';

/* Module */
import {HashRouter, Route, Switch} from "react-router-dom";

/* Component */
import Main from "./Components/Main";

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
                <button onClick={() => this.props.startGame()}>s</button>
                <div>
                    <div>
                        <main className="container main">
                            <Switch>
                                <Route exact path="/" component={Main}/>
                                <Route path="/Main" component={Main}/>
                                <Route component=""/>
                            </Switch>
                        </main>
                    </div>
                </div>
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