import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ChoosedGame({ campo, onConcludi }) {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [gamesA, setGamesA] = useState(0);
  const [gamesB, setGamesB] = useState(0);
  const [setsA, setSetsA] = useState(0);
  const [setsB, setSetsB] = useState(0);
  const [advantage, setAdvantage] = useState(null);

  const points = [0, 15, 30, 40];

  const addPoint = (team) => {
    if (team === "A") {
      if (scoreA >= 40 && scoreB < 40) {
        winGame("A");
      } else if (scoreA === 40 && scoreB === 40) {
        if (advantage === "A") {
          winGame("A");
        } else if (advantage === "B") {
          setAdvantage(null);
        } else {
          setAdvantage("A");
        }
      } else {
        setScoreA(points[points.indexOf(scoreA) + 1] || 40);
      }
    } else {
      if (scoreB >= 40 && scoreA < 40) {
        winGame("B");
      } else if (scoreB === 40 && scoreA === 40) {
        if (advantage === "B") {
          winGame("B");
        } else if (advantage === "A") {
          setAdvantage(null);
        } else {
          setAdvantage("B");
        }
      } else {
        setScoreB(points[points.indexOf(scoreB) + 1] || 40);
      }
    }
  };

  const removePoint = (team) => {
    if (team === "A") {
      setScoreA(points[points.indexOf(scoreA) - 1] || 0);
    } else {
      setScoreB(points[points.indexOf(scoreB) - 1] || 0);
    }
  };

  const winGame = (team) => {
    setScoreA(0);
    setScoreB(0);
    setAdvantage(null);
    if (team === "A") {
      if (gamesA === 5 && gamesB < 5) {
        winSet("A");
      } else if (gamesA === 5 && gamesB === 5) {
        setGamesA(6);
      } else if (gamesA === 6 && gamesB === 6) {
        setGamesA(7);
        winSet("A");
      } else {
        setGamesA(gamesA + 1);
      }
    } else {
      if (gamesB === 5 && gamesA < 5) {
        winSet("B");
      } else if (gamesB === 5 && gamesA === 5) {
        setGamesB(6);
      } else if (gamesB === 6 && gamesA === 6) {
        setGamesB(7);
        winSet("B");
      } else {
        setGamesB(gamesB + 1);
      }
    }
  };

  const winSet = (team) => {
    setGamesA(0);
    setGamesB(0);
    if (team === "A") {
      setSetsA(setsA + 1);
    } else {
      setSetsB(setsB + 1);
    }
  };

  return (
    <div className="text-center">
      <h2>{campo.nome} - Partita</h2>
      <div className="match-container p-4">
        <Row>
          <Col>
            <h3>Team A</h3>
            <h4>Set: {setsA}</h4>
            <h4>Games: {gamesA}</h4>
            <h4>{advantage === "A" ? "AD" : scoreA}</h4>
            <Button variant="danger me-2" onClick={() => addPoint("A")}>
              <i class="bi bi-plus-square"></i>
            </Button>
            <Button variant="danger" onClick={() => removePoint("A")}>
              <i class="bi bi-dash-square"></i>
            </Button>
          </Col>
          <Col>
            <h3>Team B</h3>
            <h4>Set: {setsB}</h4>
            <h4>Games: {gamesB}</h4>
            <h4>{advantage === "B" ? "AD" : scoreB}</h4>
            <Button variant="danger me-2" onClick={() => addPoint("B")}>
              <i class="bi bi-plus-square"></i>
            </Button>
            <Button variant="danger" onClick={() => removePoint("B")}>
              <i class="bi bi-dash-square"></i>
            </Button>
          </Col>
        </Row>
        <Button
          className="mt-4"
          variant="success"
          onClick={() => onConcludi(campo.id)}
        >
          Concludi Partita
        </Button>
      </div>
    </div>
  );
}
