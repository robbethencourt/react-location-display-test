import React, { Component } from "react";

export default class DriverLocation extends Component {
  render() {
    return (
      <div className="driver-details">
        <p>{this.props.text}</p>
      </div>
    );
  }
}
