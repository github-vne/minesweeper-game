import React, {Component} from 'react';
import './style.css';

/* Module */
import {Redirect} from "react-router";

/* Components */

/* Redux */
import {bindActionCreators} from "redux";
import {handleClick, checkMine} from "../../Store/actions";
import {connect} from "react-redux";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            redirect: false,
            error: false,
        }
    }

    signIn(){
        const {login} = this.state;
        if(login.trim() === "") {
            this.setState({error: true});
            return false;
        }
        localStorage.setItem('userSapper', login);
        this.setState({redirect: true});
    }

    render() {
        const {login, redirect, error} = this.state;
        if (redirect) return <Redirect to='/'/>;
        return (
            <div className="page_sign_in">
                <aside className="sign_in_form">
                    <h3>Введите ваше имя</h3>
                    <input
                        className={error ? "sign_in_data_err" : "sign_in_data"}
                        type="text"
                        value={login}
                        onChange={(e) => this.setState({login: e.target.value})}
                    />
                    <button
                        onClick={() => this.signIn()}
                        className="gold_btn">Войти</button>
                </aside>
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
