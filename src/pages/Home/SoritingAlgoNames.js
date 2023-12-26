import React from "react";
import "./SoritingAlgoNames.css";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class BootstrapCarouselComponent extends React.Component {
  render() {
    return (
      <div className="cors">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="page1.gif"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <a
                      id="anc"
                      className="btn1"
                      href="https://www.javatpoint.com/bubble-sort"
                      target="_blank"
                      rel=""
                    >
                      Read More...
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="page2.gif "
                    alt="Second slide"
                  />

                  <Carousel.Caption>
                    <a
                      id="anc"
                      href="https://www.javatpoint.com/cocktail-sort"
                      target="_blank"
                      rel=""
                    >
                      Read More...
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="page3.gif"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <a
                      id="anc"
                      href="https://www.javatpoint.com/heap-sort"
                      target="_blank"
                      rel=""
                    >
                      Read More...
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="page4.gif"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <a
                      id="anc"
                      href="https://www.javatpoint.com/insertion-sort"
                      target="_blank"
                      rel=""
                    >
                      Read More...
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="page5.gif"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <a
                      id="anc"
                      href="https://www.javatpoint.com/daa-linear-time-sorting"
                      target="_blank"
                      rel=""
                    >
                      Read More...
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="page6.gif"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <a
                      id="anc"
                      href="https://www.javatpoint.com/merge-sort"
                      target="_blank"
                      rel=""
                    >
                      Read More...
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="page7.gif"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <a
                      id="anc"
                      href="https://www.javatpoint.com/quick-sort"
                      target="_blank"
                      rel=""
                    >
                      Read More...
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="page8.gif"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <a
                      id="anc"
                      href="https://www.javatpoint.com/selection-sort"
                      target="_blank"
                      rel=""
                    >
                      Read More...
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BootstrapCarouselComponent;
