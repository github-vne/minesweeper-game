import React, {Component} from 'react';
import './style.css';

/* Components */
import Header from './Header';
import Game from './Game';
import Settings from './Settings';

class Main extends Component {

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

export default Main;
