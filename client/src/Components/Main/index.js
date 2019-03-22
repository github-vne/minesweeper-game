import React, {Component} from 'react';
import './style.css';

/* Components */

/* Redux */
import {bindActionCreators} from "redux";
import {handleClick, checkMine} from "../../Store/actions";
import {connect} from "react-redux";

class Main extends Component {

    render() {
        const {field, viewField, handleClick, gameOver, checkMine} = this.props;
        return (
            <div className="game">
                {gameOver && <div>Вы проиграли</div>}
                {field.map((row, i) => {
                    return (
                        <div key={i} className="row">
                            {row.map((el, j) => {
                                return (
                                    <button
                                        disabled={gameOver ? "disabled" : ""}
                                        onClick={() => handleClick({i,j})}
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            checkMine({i,j});
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
