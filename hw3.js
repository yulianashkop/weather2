import React from 'react';
import axios from 'axios';


class Hw3 extends React.Component {
    dataFromServer = () => {
        const key = '59a56cadf932516f889c66827be02f40';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=${key}`;
        const axiosGetResponse = axios.get(url);
        function doSomethingWhenAxiosFinish(axiosResponseFromServer) {
            if (axiosResponseFromServer.status === 200) {
                this.setState({
                    weather: axiosResponseFromServer.data
                });
            }
        }
        axiosGetResponse.then(doSomethingWhenAxiosFinish.bind(this));
    };

    constructor(props) {
        super(props);
        this.state = {
            city: props.city || 'New York',
            weather: {},
        };
        console.log('constructor');
    }
    componentDidMount() {
        console.log('componentDidMount');
        this.dataFromServer();
    }
    onTextInputChange = (event) => {
        console.info('the user entered: ', event.target.value)
        this.setState({
            city: event.target.value
        })
    };
    onSendCityToServerClick = (event) => {
        this.dataFromServer();
    };
    render() {
        const weather = this.state.weather;
        if (weather.main) {
            return (
                <div>
                    <input onChange={this.onTextInputChange}  />
                    <button onClick={this.onSendCityToServerClick}>search</button>
                    <div>{weather.name},{weather.sys.country}</div>

                    <div>{weather.main.temp}</div>

                    <div>{`feels like ${weather.main.feels_like}`}</div>
                </div>
            );
        }
        return <div>Loading...</div>;
    }
}

export default Hw3;