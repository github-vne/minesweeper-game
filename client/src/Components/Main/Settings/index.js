import React, {Component} from 'react';
import './style.css';

class Settings extends Component {
    render() {
        return (
            <section className="game_settings">
                <h4>Настройки</h4>
                <div className="settings_box">
                    <label>Размер поля</label>
                    <input type="number"/>
                </div>
                <div className="settings_box">
                    <label>Кол-во мин</label>
                    <input type="number"/>
                </div>
                <div className="apply_settings">
                    <button className="gold_btn">Применить</button>
                </div>
            </section>
        )
    }
}

export default Settings;