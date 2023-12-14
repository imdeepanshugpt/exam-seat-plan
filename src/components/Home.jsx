import React, { useState } from "react";
import Seats from "./Seats";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

const Home = () => {
  const [formData, setFormData] = useState({
    row: 0,
    col: 0,
    start1: 0,
    end1: 0,
    start2: 0,
    end2: 0,
  });
  const [error, setError] = useState("");

  const submitForm = (event) => {
    const data = {
      row: Number(event.target[0].value),
      col: Number(event.target[1].value),
      start1: Number(event.target[2].value),
      end1: Number(event.target[3].value),
      start2: Number(event.target[4].value),
      end2: Number(event.target[5].value),
    };

    const totalCell = data.row * data.col;
    const rangeDiff =
      (data.end1 - data.start1) + (data.end2 - data.start2 );

    if (data?.start1 > data?.end1) {
      setError("Range 1 : Roll no start should be less end");
    } else if (data?.start2 > data?.end2) {
      setError("Range 2 : Roll no start should be less end");
    } else if (rangeDiff > totalCell) {
      setError("Number of students exceeds to number of seats");
    } else {
        setError("");
    }

    setFormData(data);
    event.preventDefault();
  };

  return (
    <div className="container">
        <h1>Create Exam Seat Plan</h1>
      <Form onSubmit={submitForm}>
        <Row className="mb-3">
          <Form.Group as={Col} sm={3} controlId="formGroupRow">
            <Form.Label>Row</Form.Label>
            <Form.Control type="number" placeholder="Row" min={1} max={12} />
          </Form.Group>
          <Form.Group as={Col} sm={3} controlId="formGroupColumn">
            <Form.Label>Column</Form.Label>
            <Form.Control type="number" placeholder="Column" min={1} max={12} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} sm={3} controlId="formGroupStart1">
            <Form.Label>Range 1 : Start</Form.Label>
            <Form.Control
              type="number"
              placeholder="Starting Roll No"
              min={1}
            />
          </Form.Group>
          <Form.Group as={Col} sm={3} controlId="formGroupEnd1">
            <Form.Label>Range 1 : End</Form.Label>
            <Form.Control type="number" placeholder="End Roll No" min={1} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} sm={3} controlId="formGroupStart2">
            <Form.Label>Range 2 : Start</Form.Label>
            <Form.Control type="number" placeholder="Starting Roll No" />
          </Form.Group>
          <Form.Group as={Col} sm={3} controlId="formGroupEnd2">
            <Form.Label>Range 2 : End</Form.Label>
            <Form.Control type="number" placeholder="End Roll No" />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Generate
        </Button>
      </Form>
      {error !== "" ? (
        <Alert key="danger" variant="danger">
          {error}
        </Alert>
      ) : (
        ""
      )}
      <Seats data={formData} />
    </div>
  );
};

export default Home;
