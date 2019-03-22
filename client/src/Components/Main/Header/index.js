import React, {Component} from 'react';
import './style.css';

/* IMG */
import SapperImg from "../../../Static/img/sapper.png";
import {Link} from "react-router-dom";

/* Redux */

class Header extends Component {
    render() {
        return (
            <header>
                <img src={SapperImg} alt="SapperImg" className="sapper_img"/>
                <div className="right_header">
                    <p>Здравствуйте, Nikolay</p>
                    <Link to="/sign_in" className="gold_btn">Выйти</Link>
                </div>
            </header>
        )
    }
}

export default Header;