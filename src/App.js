import React, { Component } from "react";
import "./App.css";
import { firebase, gmConfig } from "./config.js";
import GoogleMapReact from "google-map-react";
import DriverLocation from "./DriverLocation.js";

class App extends Component {
  state = {
    center: [28.4, -81.2],
    zoom: 10,
    driversToDisplay: ["hello"],
    fbError: ""
  };

  componentDidMount() {
    const driversRef = firebase.database().ref("drivers");
    driversRef.on("value", snapshot => {
      let drivers = snapshot.val();
      const driverIds = Object.keys(drivers);
      const driversIdArray = driverIds.map(drvId => {
        return {
          driverId: drvId
        };
      });
      const latLngArray = Object.keys(drivers).map(key => drivers[key]);
      const fullDriversObject = driversIdArray.map(({ driverId }, i) => {
        return {
          driverId: driverId,
          latitude: latLngArray[i].latitude,
          longitude: latLngArray[i].longitude
        };
      });
      this.setState({ driversToDisplay: fullDriversObject });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Display Drivers from Firebase</h1>
        </header>
        <div className="App-intro">
          {this.state.driversToDisplay.map((driver, i) => {
            return (
              <p key={i}>
                driver: {driver.driverId}, lat: {driver.latitude}, lng:{
                  driver.longitude
                }
              </p>
            );
          })}
        </div>
        <p>{this.state.fbError}</p>
        <div className="google-map-container">
          <GoogleMapReact
            bootstrapURLKeys={{ key: gmConfig.GM_API }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
            {this.state.driversToDisplay.map((driverDetails, i) => {
              return (
                <DriverLocation
                  key={i}
                  lat={driverDetails.latitude}
                  lng={driverDetails.longitude}
                  text={driverDetails.driverId}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
