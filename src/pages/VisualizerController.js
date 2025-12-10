import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import SplitButton from "react-bootstrap/SplitButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./VisualizerController.css";

function VisualizerController({ visualizerData, controllerDataHandler }) {
  const [sortingAlgorithm, setSortingAlgorithm] = useState("Bubble Sort");
  const [speed, setSpeed] = useState("Fast");
  const [size, setSize] = useState("15");
  const [barColor, setBarColor] = useState("Blue");
  const [pointerColor, setPointerColor] = useState("Red");
  const [sortedColor, setSortedColor] = useState("Green");

  const randomizeRef = useRef(null);
  const sortRef = useRef(null);
  const speedRef = useRef(null);
  const sizeRef = useRef(null);
  const sortingAlgorithmRef = useRef(null);
  const barColorRef = useRef(null);
  const pointerColorRef = useRef(null);
  const sortedColorRef = useRef(null);

  useEffect(() => {
    if (visualizerData === true) {
      randomizeRef.current.textContent = "Randomize Array";
    }
  }, [visualizerData]);

  const updateState = () => {
    return {
      sortingAlgorithm,
      speed,
      size,
      barColor,
      pointerColor,
      sortedColor,
    };
  };

  const onSelectingSortingAlgorithm = (eventKey) => {
    setSortingAlgorithm(eventKey);
  };

  const onSelectingSpeed = (eventKey) => {
    setSpeed(eventKey);
  };

  const onSelectingSize = (eventKey) => {
    let temp = updateState();
    temp["sort"] = false;
    temp["randomize"] = true;
    temp["size"] = eventKey;
    setSize(eventKey);
    controllerDataHandler({ ...temp, size: eventKey });
  };

  const onSelectingBarColor = (eventKey) => {
    let temp = updateState();
    temp["sort"] = false;
    temp["randomize"] = false;
    temp["barColor"] = eventKey;
    setBarColor(eventKey);
    controllerDataHandler({ ...temp, barColor: eventKey });
  };

  const onSelectingPointerColor = (eventKey) => {
    setPointerColor(eventKey);
  };

  const onSelectingSortedColor = (eventKey) => {
    setSortedColor(eventKey);
  };

  const randomize = () => {
    randomizeRef.current.textContent = "Randomize Array";
    sortRef.current.disabled = false;
    speedRef.current.disabled = false;
    sizeRef.current.disabled = false;
    sortingAlgorithmRef.current.disabled = false;
    barColorRef.current.disabled = false;
    pointerColorRef.current.disabled = false;
    sortedColorRef.current.disabled = false;

    let temp = updateState();
    temp["sort"] = false;
    temp["randomize"] = true;
    controllerDataHandler(temp);
  };

  const sort = () => {
    randomizeRef.current.textContent = "Stop & Reset Array";
    sortRef.current.disabled = true;
    speedRef.current.disabled = true;
    sizeRef.current.disabled = true;
    sortingAlgorithmRef.current.disabled = true;
    barColorRef.current.disabled = true;
    pointerColorRef.current.disabled = true;
    sortedColorRef.current.disabled = true;

    let temp = updateState();
    temp["sort"] = true;
    temp["randomize"] = false;
    temp["sorted"] = false;
    controllerDataHandler(temp);
  };

  return (
    <div className="VisualizerController">
      <Container>
        <Row>
          <Col>
            <h1>
              <i className="neon-red">Algorithm</i>
              <br />
              <i className="neon-blue">Visualizer</i>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <SplitButton
              title={sortingAlgorithm}
              id="sortingAlogrithm"
              variant="light"
              onSelect={onSelectingSortingAlgorithm}
              ref={sortingAlgorithmRef}
            >
              <Dropdown.Item disabled>Sorting Algorithm</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="Bubble Sort">
                Bubble Sort (Default)
              </Dropdown.Item>
              <Dropdown.Item eventKey="Cocktail Sort">
                Cocktail Sort
              </Dropdown.Item>
              <Dropdown.Item eventKey="Heap Sort">Heap Sort</Dropdown.Item>
              <Dropdown.Item eventKey="Insertion Sort">
                Insertion Sort
              </Dropdown.Item>
              <Dropdown.Item eventKey="Linear Sort">Linear Sort</Dropdown.Item>
              <Dropdown.Item eventKey="Merge Sort">Merge Sort</Dropdown.Item>
              <Dropdown.Item eventKey="Quick Sort">Quick Sort</Dropdown.Item>
              <Dropdown.Item eventKey="Selection Sort">
                Selection Sort
              </Dropdown.Item>
            </SplitButton>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <SplitButton
              title={speed}
              id="speed"
              variant="light"
              onSelect={onSelectingSpeed}
              ref={speedRef}
            >
              <Dropdown.Item disabled>Speed Of Visualization</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="Very Fast">Very fast</Dropdown.Item>
              <Dropdown.Item eventKey="Fast">Fast (Default)</Dropdown.Item>
              <Dropdown.Item eventKey="Normal">Normal</Dropdown.Item>
              <Dropdown.Item eventKey="Slow">Slow</Dropdown.Item>
              <Dropdown.Item eventKey="Very Slow">Very Slow</Dropdown.Item>
            </SplitButton>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <SplitButton
              title={size}
              id="size"
              variant="light"
              onSelect={onSelectingSize}
              ref={sizeRef}
            >
              <Dropdown.Item disabled>Size Of Array</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="10">10</Dropdown.Item>
              <Dropdown.Item eventKey="15">15(Default)</Dropdown.Item>
              <Dropdown.Item eventKey="20">20</Dropdown.Item>
              <Dropdown.Item eventKey="25">25</Dropdown.Item>
              <Dropdown.Item eventKey="30">30</Dropdown.Item>
              <Dropdown.Item eventKey="35">35</Dropdown.Item>
              <Dropdown.Item eventKey="40">40</Dropdown.Item>
              <Dropdown.Item eventKey="45">45</Dropdown.Item>
              <Dropdown.Item eventKey="50">50</Dropdown.Item>
            </SplitButton>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <SplitButton
              title={barColor}
              id="barColor"
              variant="light"
              onSelect={onSelectingBarColor}
              ref={barColorRef}
            >
              <Dropdown.Item disabled>Color Of Bar</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="Black">Black</Dropdown.Item>
              <Dropdown.Item eventKey="Blue">Blue (Default)</Dropdown.Item>
              <Dropdown.Item eventKey="Cyan">Cyan</Dropdown.Item>
              <Dropdown.Item eventKey="Green">Green</Dropdown.Item>
              <Dropdown.Item eventKey="Pink">Pink</Dropdown.Item>
              <Dropdown.Item eventKey="Red">Red</Dropdown.Item>
              <Dropdown.Item eventKey="Yellow">Yellow</Dropdown.Item>
            </SplitButton>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <SplitButton
              title={pointerColor}
              id="pointerColor"
              variant="light"
              onSelect={onSelectingPointerColor}
              ref={pointerColorRef}
            >
              <Dropdown.Item disabled>Color Of Comparisions</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="Black">Black</Dropdown.Item>
              <Dropdown.Item eventKey="Blue">Blue</Dropdown.Item>
              <Dropdown.Item eventKey="Cyan">Cyan</Dropdown.Item>
              <Dropdown.Item eventKey="Green">Green</Dropdown.Item>
              <Dropdown.Item eventKey="Pink">Pink</Dropdown.Item>
              <Dropdown.Item eventKey="Red">Red (Default)</Dropdown.Item>
              <Dropdown.Item eventKey="Yellow">Yellow</Dropdown.Item>
            </SplitButton>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <SplitButton
              title={sortedColor}
              id="sortedColor"
              variant="light"
              onSelect={onSelectingSortedColor}
              ref={sortedColorRef}
            >
              <Dropdown.Item disabled>Color Of Sorted Elements</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="Black">Black</Dropdown.Item>
              <Dropdown.Item eventKey="Blue">Blue</Dropdown.Item>
              <Dropdown.Item eventKey="Cyan">Cyan</Dropdown.Item>
              <Dropdown.Item eventKey="Green">Green (Default)</Dropdown.Item>
              <Dropdown.Item eventKey="Pink">Pink</Dropdown.Item>
              <Dropdown.Item eventKey="Red">Red</Dropdown.Item>
              <Dropdown.Item eventKey="Yellow">Yellow</Dropdown.Item>
            </SplitButton>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button
              id="randomBtn"
              ref={randomizeRef}
              size="lg"
              variant="danger"
              onClick={randomize}
            >
              Randomize Array
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button
              id="sortBtn"
              ref={sortRef}
              size="lg"
              variant="success"
              onClick={sort}
            >
              Start Sort
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default VisualizerController;
