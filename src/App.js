import React from "react";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Sorting from "./pages/Sorting";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Algorithm Visualizer</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/sorting">
                  Sorting
                </Nav.Link>
                <Nav.Link as={Link} to="/about">
                  About
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sorting" element={<Sorting />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
