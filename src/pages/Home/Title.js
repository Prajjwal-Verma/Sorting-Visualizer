import React, { Component } from "react";
import "./Title.css";
export default class Title extends Component {
  render() {
    return (
      <div class="main">
        <div class="stage">
          <div class="wrapper">
            <div class="slash"></div>
            <div class="sides">
              <div class="side"></div>
              <div class="side"></div>
              <div class="side"></div>
              <div class="side"></div>
            </div>
            <div class="text">
              <div class="text--backing">Algorithm Visulizer</div>
              <div class="text--left">
                <div class="inner">Algorithm Visulizer</div>
              </div>
              <div class="text--right">
                <div class="inner">Algorithm Visulizer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
