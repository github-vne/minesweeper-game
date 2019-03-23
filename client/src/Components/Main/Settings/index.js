import React, {Component} from 'react';
import './style.css';

/* Redux */
import {bindActionCreators} from "redux";
import {changeSettings} from "../../../Store/actions";
import connect from "react-redux/es/connect/connect";

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: 0,
            mines: 0,
        }
    }

    componentDidMount() {
        this.setState({
            size: this.props.size,
            mines: this.props.mines,
        })
    }

    countSize = (act) => {
        const {size, mines} = this.state;
        const maxSize = 15;
        const minSize = 2;

        switch (act) {
            case 'inc':
                if(size + 1 > maxSize) return false;
                this.setState({size: size + 1});
                break;

            case 'dec':
                if(size - 1 < minSize) return false;
                if(size * size - 1 > mines) this.setState({mines: size -1});
                this.setState({size: size - 1});
                break
        }
    };

    countMines = (act) => {
        const {mines, size} = this.state;
        const maxMines = size * size - 1;
        const minMines = 1;

        switch (act) {
            case 'inc':
                if(mines + 1 > maxMines) return false;
                this.setState({mines: mines + 1});
                break;

            case 'dec':
                if(mines - 1 < minMines) return false;
                this.setState({mines: mines - 1});
                break;
        }
    };

    render() {
        const {size, mines} = this.state;
        const {changeSettings} = this.props;
        return (
            <section className="game_settings">
                <h4>Настройки</h4>
                <div className="settings_box">
                    <label>Размер поля (max: 15)</label>
                    <div className="count_settings">
                        <button
                            className="gold_btn"
                            onClick={() => this.countSize('dec')}
                        >-
                        </button>
                        <span>{size}</span>
                        <button
                            className="gold_btn"
                            onClick={() => this.countSize('inc')}
                        >+
                        </button>
                    </div>
                </div>
                <div className="settings_box">
                    <label>Кол-во мин</label>
                    <div className="count_settings">
                        <button
                            className="gold_btn"
                            onClick={() => this.countMines('dec')}
                        >-
                        </button>
                        <span>{mines}</span>
                        <button
                            className="gold_btn"
                            onClick={() => this.countMines('inc')}
                        >+
                        </button>
                    </div>
                </div>
                <div className="apply_settings">
                    <button
                        className="gold_btn"
                        onClick={() => changeSettings({size: size, mines: mines})}
                    >Применить</button>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        size: state.size,
        mines: state.mines,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSettings: bindActionCreators(changeSettings, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);