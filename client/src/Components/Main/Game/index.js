import React, {Component} from 'react';
import './style.css';

/* IMG */
import SmileSad from '../../../Static/img/smile_sad.png';
import SmileJoyful from '../../../Static/img/smile_joyful.png';

/* Redux */
import {bindActionCreators} from "redux";
import {checkMine, handleClick, startGame, saveTime} from "../../../Store/actions";
import connect from "react-redux/es/connect/connect";

/* img */
import DeadPoolImg from '../../../Static/img/deadpool.png';
import BtnImg from '../../../Static/img/button/btn.png';
import FlagImg from '../../../Static/img/button/btn_flag.png';
import MineImg from '../../../Static/img/button/btn_mine.png';
import Btn0Img from '../../../Static/img/button/btn_0.png';
import Btn1Img from '../../../Static/img/button/btn_1.png';
import Btn2Img from '../../../Static/img/button/btn_2.png';
import Btn3Img from '../../../Static/img/button/btn_3.png';
import Btn4Img from '../../../Static/img/button/btn_4.png';
import Btn5Img from '../../../Static/img/button/btn_5.png';
import Btn6Img from '../../../Static/img/button/btn_6.png';
import Btn7Img from '../../../Static/img/button/btn_7.png';
import Btn8Img from '../../../Static/img/button/btn_8.png';

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            milliseconds: 0,
            seconds: 0,
            min: 0,
            gameOver: true,
        }
    }

    start() {
        this.setState({min: 0, seconds: 0, milliseconds: 0});
        this.props.startGame();
        const tick = () => {
            let {milliseconds, seconds, min} = this.state;
            if (this.props.gameOver) {
                this.props.saveTime(`${min}:${seconds}:${milliseconds}`);
                return false;
            }
            if (seconds >= 60) {
                this.setState({min: min + 1, seconds: 0});
            } else if (milliseconds >= 9) {
                this.setState({milliseconds: 0, seconds: seconds + 1});
            } else {
                this.setState({milliseconds: milliseconds + 1});
            }
            setTimeout(() => tick(), 100);
        };
        setTimeout(() => tick(), 100);
    }

    render() {
        const {milliseconds, seconds, min} = this.state;
        const {field, viewField, handleClick, gameOver, checkMine, statusGame, mines} = this.props;
        return (
            <section className="game_box">
                <div className="game_panel">
                    <img src={statusGame !== "loos" ? SmileJoyful : SmileSad} alt="Smile" className="smile"/>
                    <div>
                        <p>Таймер: {min}:{seconds}:{milliseconds}</p>
                        <p>Всего мин: {mines}</p>
                    </div>
                </div>
                <div className="field">
                    {field.map((row, i) => {
                        return (
                            <div key={i} className="row">
                                {row.map((el, j) => {
                                    let imgType;
                                    if (viewField[i][j] === -2) {
                                        imgType = MineImg;
                                    } else if (viewField[i][j] === 0) {
                                        imgType = BtnImg;
                                    } else if (viewField[i][j] === -1) {
                                        imgType = FlagImg;
                                    } else {
                                        switch (el) {
                                            case 0: imgType = Btn0Img; break;
                                            case 1: imgType = Btn1Img; break;
                                            case 2: imgType = Btn2Img; break;
                                            case 3: imgType = Btn3Img; break;
                                            case 4: imgType = Btn4Img; break;
                                            case 5: imgType = Btn5Img; break;
                                            case 6: imgType = Btn6Img; break;
                                            case 7: imgType = Btn7Img; break;
                                            case 8: imgType = Btn8Img; break;
                                        }
                                    }
                                    return (
                                        <img src={imgType}
                                             alt="btn"
                                             key={j}
                                             onClick={() => handleClick({i, j})}
                                             onContextMenu={(e) => {
                                                 e.preventDefault();
                                                 checkMine({i, j});
                                             }}
                                        />
                                    );
                                })}
                            </div>
                        )
                    })}
                </div>
                {field.length === 0 && <img src={DeadPoolImg} alt="DeadPoolImg" className="deadpool"/>}
                {gameOver &&
                    <button className="gold_btn start_game"
                            onClick={() => this.start()}>
                        Начать игру
                    </button>
                }
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        field: state.field,
        viewField: state.viewField,
        gameOver: state.gameOver,
        statusGame: state.statusGame,
        mines: state.mines,
        timer: state.timer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: bindActionCreators(handleClick, dispatch),
        checkMine: bindActionCreators(checkMine, dispatch),
        startGame: bindActionCreators(startGame, dispatch),
        saveTime: bindActionCreators(saveTime, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
