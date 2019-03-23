import React, {Component} from 'react';
import './style.css';

/* Module */
import {Redirect} from "react-router";

/* Components */
import Header from './Header';
import Game from './Game';
import Settings from './Settings';

/* Redux */
import connect from "react-redux/es/connect/connect";

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            redirect: false,
        }
    }

    componentDidMount() {
        if(this.props.userName === "") this.setState({redirect: true});
    }

    render() {
        const {redirect} = this.state;
        if (redirect) return <Redirect to='/sign_in'/>;
        return (
            <main>
                <Header/>
                <div className="game_container">
                    <Game/>
                    <Settings/>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.userName,
    }
};

export default connect(mapStateToProps)(Main);