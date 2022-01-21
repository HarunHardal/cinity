import React, { Component } from "react";
import "./loader.css";
import { quotes } from "./quotes";
export default class Loader extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      endValue: 100,
      randomNumber: Math.floor(Math.random() * 100),
    };
  }
  componentDidMount() {
    this.loader();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }
  loader = () => {
    const bar = document.querySelector(".circular-progress");
    let speed;
    if (this.props.loadTime < 0) {
      speed = 50;
    } else {
      speed = this.props.loadTime;
    }

    let progress = setInterval(() => {
      this.setState({
        value: this.state.value + 1,
      });
      bar.style.background = `conic-gradient(
                #b20000 ${this.state.value * 3.6}deg,
                #101010 ${this.state.value * 3.6}deg
                )`;

      if (this.state.value === this.state.endValue) {
        clearInterval(progress);
      }
    }, speed);
  };
  render() {
    return (
      <div
        className={
          this.state.value === this.state.endValue
            ? "loader-component loader-none"
            : "loader-component"
        }
      >
        <div className="progress-container">
          <div className="circular-progress">
            <div className="value-container">{this.state.value}%</div>
          </div>
        </div>
        <div className="Quotes-container">
          <p className="Quotes">{quotes[this.state.randomNumber].quotes}</p>
          <p className="movie-names">
            - {quotes[this.state.randomNumber].movieName} (
            {quotes[this.state.randomNumber].year})
          </p>
        </div>
      </div>
    );
  }
}
