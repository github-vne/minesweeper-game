import React, {Component} from 'react';
import './style.css';

/* Components */
import Header from './Header';
import Game from './Game';
import Settings from './Settings';

/* Redux */
import {bindActionCreators} from "redux";
import {changeModal} from "../../Store/actions";
import connect from "react-redux/es/connect/connect";

class Main extends Component {

    componentDidMount() {
        // this.props.changeModal();
    }


    render() {
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



const mapDispatchToProps = (dispatch) => {
    return {
        changeModal: bindActionCreators(changeModal, dispatch),
    }
};

export default connect("", mapDispatchToProps)(Main);