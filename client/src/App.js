import React from "react";
import AddSecret from "./components/add-secret";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FindSecret from "./components/find-secret";

function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <Container>
        <Row>
          <Col>
            <header className="App-header">Secret server</header>
          </Col>
        </Row>
        <Row>
          <Col>
            <AddSecret />
          </Col>
          <Col>
            <FindSecret />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
