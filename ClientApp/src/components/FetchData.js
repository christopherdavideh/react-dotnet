import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  

  static renderForecastsTable(forecasts) {

    const formatDate = (current_datetime)=>{

      let minutes = `${current_datetime.getMinutes()}`;
      let min;
      if (minutes.length === 1) {
          min= "0"+ minutes;
      } else {
          min = minutes;
      }
      let formatted_date = current_datetime.getDate() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getFullYear() + ", " + current_datetime.getHours() + ":" + min;
      return formatted_date;
    }  
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Clima</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.date}>
              <td>{formatDate(new Date(forecast.date))}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('weatherforecast/getData');
    const data = await response.json();
    console.log(data);
    this.setState({ forecasts: data, loading: false });
  }
}
