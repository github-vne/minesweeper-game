import React, {Component} from 'react';
import './style.css';

/* Module */
import axios from 'axios';
import {Link} from 'react-router-dom';

/* Redux */
import {bindActionCreators} from "redux";
import {getStatistics} from "../../Store/actions";
import connect from "react-redux/es/connect/connect";

class Table extends Component {

    componentDidMount(){
        axios.get('http://localhost:3001/statistic')
            .then(res => this.props.getStatistics(res.data))
            .catch(err => {
                console.info("Error");
                console.error(err);
            });
    }

    render() {
        const {statistics} = this.props;
        console.info(statistics);
        return(
            <div className="table_page">
                <Link to="/" className="gold_btn">
                    Назад
                </Link>
                <section className="table">
                    <h2>Таблица рекордов</h2>
                    <div className="table_row">
                        <span>Имя</span>
                        <span>Поле</span>
                        <span>Мины</span>
                        <span>Время</span>
                    </div>
                    {statistics.map((el,i) =>{
                        return (
                            <div className="table_row" key={i}>
                                <span>{el.name}</span>
                                <span>{el.size}</span>
                                <span>{el.mine}</span>
                                <span>{el.time}</span>
                            </div>
                        )
                    })}

                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        statistics: state.statistics,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        getStatistics: bindActionCreators(getStatistics, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);