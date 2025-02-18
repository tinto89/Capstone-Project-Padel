import React, { useState } from "react";
import { Button, Row, Col, Alert } from "react-bootstrap";

export default function ChoosedGame({ campo, setPartitaInCorso, getFields }) {
  const [scoreA, setScoreA] = useState(campo.scoreA);
  const [scoreB, setScoreB] = useState(campo.scoreB);
  const [advantage, setAdvantage] = useState(campo.advantage);
  const [gamesA, setGamesA] = useState(campo.gamesA);
  const [gamesB, setGamesB] = useState(campo.gamesB);
  const [setsA, setSetsA] = useState(campo.setsA);
  const [setsB, setSetsB] = useState(campo.setsB);
  const [tieBreak, setTieBreak] = useState(false);
  const [winner, setWinner] = useState(null);
  const [serving, setServing] = useState("A");

  const scoreSteps = [0, 15, 30, 40];

  const updateGameInDatabase = async (newData) => {
    try {
      await fetch(`http://localhost:3001/api/fields/${campo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stato: newData.stato,
          scoreA: newData.scoreA,
          scoreB: newData.scoreB,
          advantage: newData.advantage,
          setsA: newData.setsA,
          setsB: newData.setsB,
          gamesA: newData.gamesA,
          gamesB: newData.gamesB,
        }),
      });

      getFields();
    } catch (error) {
      console.error("Errore nell'aggiornamento del campo:", error);
    }
  };

  const updateScore = (team) => {
    let newScoreA = scoreA;
    let newScoreB = scoreB;
    let newAdvantage = advantage;
    let newGamesA = gamesA;
    let newGamesB = gamesB;
    let newSetsA = setsA;
    let newSetsB = setsB;

    if (tieBreak) {
      if (team === "A") {
        newScoreA += 1;
        if (newScoreA >= 6 && newScoreA - newScoreB >= 1) {
          newSetsA += 1;
          newScoreA = 0;
          newScoreB = 0;
          newGamesA = 0;
          newGamesB = 0;
          setTieBreak(false);
        }
      } else {
        newScoreB += 1;
        if (newScoreB >= 6 && newScoreB - newScoreA >= 1) {
          newSetsB += 1;
          newScoreA = 0;
          newScoreB = 0;
          newGamesA = 0;
          newGamesB = 0;
          setTieBreak(false);
        }
      }
    } else {
      if (scoreA === 40 && scoreB === 40) {
        if (advantage === team) {
          handleGameWin(team);
          return;
        } else if (advantage === null) {
          newAdvantage = team;
        } else {
          newAdvantage = null;
        }
      } else if (scoreA === 40 && team === "A") {
        handleGameWin("A");
        return;
      } else if (scoreB === 40 && team === "B") {
        handleGameWin("B");
        return;
      } else {
        if (team === "A")
          newScoreA = scoreSteps[scoreSteps.indexOf(scoreA) + 1];
        if (team === "B")
          newScoreB = scoreSteps[scoreSteps.indexOf(scoreB) + 1];
      }
    }

    setScoreA(newScoreA);
    setScoreB(newScoreB);
    setAdvantage(newAdvantage);
    updateGameInDatabase({
      scoreA: newScoreA,
      scoreB: newScoreB,
      advantage: newAdvantage,
      setsA: newSetsA,
      setsB: newSetsB,
      gamesA: newGamesA,
      gamesB: newGamesB,
    });
  };

  const handleGameWin = (team) => {
    let newGamesA = gamesA ?? 0;
    let newGamesB = gamesB ?? 0;
    let newSetsA = setsA ?? 0;
    let newSetsB = setsB ?? 0;

    if (team === "A") {
      newGamesA += 1;
      if (newGamesA >= 6 && Math.abs(newGamesA - newGamesB) >= 2) {
        newSetsA += 1;
        newGamesA = 0;
        newGamesB = 0;
      }
    } else {
      newGamesB += 1;
      if (newGamesB >= 6 && Math.abs(newGamesB - newGamesA) >= 2) {
        newSetsB += 1;
        newGamesA = 0;
        newGamesB = 0;
      }
    }

    let matchWinner = null;
    if (newSetsA === 2) matchWinner = "A";
    if (newSetsB === 2) matchWinner = "B";

    setGamesA(newGamesA);
    setGamesB(newGamesB);
    setSetsA(newSetsA);
    setSetsB(newSetsB);
    setServing(serving === "A" ? "B" : "A");
    setScoreA(0);
    setScoreB(0);
    setAdvantage(null);
    setWinner(matchWinner);

    updateGameInDatabase({
      scoreA: 0,
      scoreB: 0,
      advantage: null,
      setsA: newSetsA,
      setsB: newSetsB,
      gamesA: newGamesA,
      gamesB: newGamesB,
    });
  };

  const resetMatch = () => {
    setScoreA(0);
    setScoreB(0);
    setGamesA(0);
    setGamesB(0);
    setSetsA(0);
    setSetsB(0);
    setAdvantage(null);
    setWinner(null);
    updateGameInDatabase({
      scoreA: 0,
      scoreB: 0,
      advantage: null,
      setsA: 0,
      setsB: 0,
      gamesA: 0,
      gamesB: 0,
    });
  };

  const concludeMatch = async () => {
    await updateGameInDatabase({
      stato: "verde",
      scoreA: 0,
      scoreB: 0,
      advantage: null,
      setsA: 0,
      setsB: 0,
      gamesA: 0,
      gamesB: 0,
    });

    setPartitaInCorso(null);
  };

  return (
    <div className="text-center">
      <h2>{campo.nome} - Partita</h2>

      {winner && (
        <Alert variant="success" className="mt-3">
          {`🎉 Vittoria! ${
            winner === "A" ? "Team A" : "Team B"
          } ha vinto la partita! 🎉`}
        </Alert>
      )}

      {!winner && (
        <Alert variant="info" className="mt-3">
          🎾 Battitore: {serving === "A" ? "Team A" : "Team B"}
        </Alert>
      )}

      <div className="p-4">
        <Row>
          <Col>
            <h2>Team A</h2>
            <h3 className="text-outline">{campo.userA1}</h3>
            <h3 className="text-outline">{campo.userA2}</h3>
            {!winner && (
              <>
                <Button variant="danger" onClick={() => updateScore("A")}>
                  ➕
                </Button>
                <h4 className="text-outline">
                  {advantage === "A" ? "AD" : scoreA}
                </h4>
                <Button
                  variant="danger"
                  onClick={() =>
                    setScoreA(
                      scoreA !== 0
                        ? scoreSteps[scoreSteps.indexOf(scoreA) - 1]
                        : 0
                    )
                  }
                  disabled={scoreA === 0}
                >
                  ➖
                </Button>
              </>
            )}
            <h4 className="mt-4 text-outline">Set: {setsA ?? 0}</h4>
            <h4 className="text-outline">Games: {gamesA}</h4>
          </Col>
          <Col>
            <h2>Team B</h2>
            <h3 className="text-outline">{campo.userB1}</h3>
            <h3 className="text-outline">{campo.userB2}</h3>
            {!winner && (
              <>
                <Button variant="danger" onClick={() => updateScore("B")}>
                  ➕
                </Button>
                <h4 className="text-outline">
                  {advantage === "B" ? "AD" : scoreB}
                </h4>
                <Button
                  variant="danger"
                  onClick={() =>
                    setScoreB(
                      scoreB !== 0
                        ? scoreSteps[scoreSteps.indexOf(scoreB) - 1]
                        : 0
                    )
                  }
                  disabled={scoreB === 0}
                >
                  ➖
                </Button>
              </>
            )}
            <h4 className="mt-4 text-outline">Set: {setsB ?? 0}</h4>
            <h4 className="text-outline">Games: {gamesB}</h4>
          </Col>
        </Row>
        <Button className="mt-4 mx-4" variant="danger" onClick={resetMatch}>
          Re-Match
        </Button>
        <Button className="mt-4 mx-4" variant="warning" onClick={concludeMatch}>
          Concludi Partita
        </Button>
      </div>
    </div>
  );
}
