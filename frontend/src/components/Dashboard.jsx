import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "../App.css";

export default function Dashboard({ changePage }) {
  return (
    <>
      <h2>🏠 Dashboard</h2>
      <Row className="w-100 mt-4">
        <Col md={6} className="mb-4">
          <Card
            className="clickable-card btn"
            onClick={() => changePage("campiGestiti")}
          >
            <Card.Body>
              <Card.Title>Campi gestiti</Card.Title>
              <Card.Text>Clicca per vedere i campi gestiti.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card
            className="clickable-card btn"
            onClick={() => changePage("utentiRegistrati")}
          >
            <Card.Body>
              <Card.Title>Utenti registrati</Card.Title>
              <Card.Text>Clicca per vedere gli utenti registrati.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
