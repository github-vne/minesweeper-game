import React, {Component} from 'react';
import './style.css';

/* IMG */
import SapperImg from "../../../Static/img/sapper.png";
import {Link} from "react-router-dom";

/* Redux */
import {bindActionCreators} from "redux";
import {changeUserName} from "../../../Store/actions";
import connect from "react-redux/es/connect/connect";

/* Redux */

class Header extends Component {

    logout(){
        localStorage.removeItem('userSapper');
        this.props.changeUserName("");
    }

    render() {
        const {userName} = this.props;
        return (
            <header>
                <div className="left_header">
                    <img src={SapperImg} alt="SapperImg" className="sapper_img"/>
                    <Link to='/table' className="gold_btn">Таблица рекордов</Link>
                </div>
                <div className="right_header">
                    <p>Здравствуйте, {userName}</p>
                    <Link
                        to="/sign_in"
                        className="gold_btn"
                        onClick={() => this.logout()}
                    >Выйти</Link>
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.userName,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeUserName: bindActionCreators(changeUserName, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

