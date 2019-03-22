import React, {Component} from 'react';
import './style.css';

/* IMG */
import SmileSad from '../../../Static/img/smile_sad.png';
import SmileJoyful from '../../../Static/img/smile_joyful.png';

/* Redux */
import {bindActionCreators} from "redux";
import {checkMine, handleClick} from "../../../Store/actions";
import connect from "react-redux/es/connect/connect";

class Game extends Component {
    render() {
        const {field, viewField, handleClick, gameOver, checkMine} = this.props;
        return (
            <section className="game_box">
                <div className="game_panel">
                    <img src={!gameOver ? SmileJoyful : SmileSad} alt="Smile" className="smile"/>
                    <div>
                        <p>Таймер: 20.30</p>
                        <p>Осталось мин: 20</p>
                    </div>
                </div>
                <div className="field">
                    {field.map((row, i) => {
                        return (
                            <div key={i} className="row">
                                {row.map((el, j) => {
                                    return (

                                        <button
                                            disabled={
                                                gameOver || viewField[i][j] === 1 ? "disabled" : ""
                                            }
                                            onClick={() => handleClick({i, j})}
                                            onContextMenu={(e) => {
                                                // e.preventDefault();
                                                checkMine({i, j});
                                            }}
                                            key={j}
                                        >
                                            {viewField[i][j] === 0 ? "" :
                                                viewField[i][j] === 1 ? el : "!"}
                                        </button>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </section>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        field: state.field,
        viewField: state.viewField,
        gameOver: state.gameOver,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: bindActionCreators(handleClick, dispatch),
        checkMine: bindActionCreators(checkMine, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
