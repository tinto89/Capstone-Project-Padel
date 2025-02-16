import React, { useState } from "react";
import "../App.css";
import { Row, Col, Card, Button } from "react-bootstrap";
import ChoosedGame from "./ChoosedGame";

export default function CampiGestiti({ partitaInCorso, setPartitaInCorso }) {
  // Stato per la partita attiva e per i campi gestiti

  const [campi, setCampi] = useState([
    { id: 1, nome: "Verona Padel Campo 1", stato: "verde" },
    { id: 2, nome: "Verona Padel Campo 2", stato: "rosso" },
    { id: 3, nome: "Verona Padel Campo 3", stato: "verde" },
    { id: 4, nome: "Verona Padel Campo 4", stato: "rosso" },
    { id: 5, nome: "Verona Padel Campo 5", stato: "verde" },
    { id: 6, nome: "Verona Padel Campo 6", stato: "rosso" },
  ]);

  // Funzione per concludere la partita e cambiare lo stato del campo
  const concludiPartita = (idCampo) => {
    setCampi((prevCampi) =>
      prevCampi.map((campo) =>
        campo.id === idCampo ? { ...campo, stato: "verde" } : campo
      )
    );
    setPartitaInCorso(null); // Torna alla schermata principale
  };

  // Se è attiva una partita, mostra il componente ChoosedGame
  if (partitaInCorso) {
    return <ChoosedGame campo={partitaInCorso} onConcludi={concludiPartita} />;
  }

  return (
    <>
      <h2>Campi Gestiti</h2>
      <Row className="w-100 d-flex justify-content-center mt-4">
        {campi.map((campo) => (
          <Col md={5} className="mb-4" key={campo.id}>
            <Card className="p-3 shadow-sm">
              <Card.Body className="text-center position-relative">
                <h5 className="fw-bold">{campo.nome}</h5>
                <p className="fw-bold">
                  {campo.stato === "verde" ? "Disponibile" : "Occupato"}
                </p>
                <div className={`stato-indicatore ${campo.stato}`} />
                <Row className="mt-3">
                  <Col>
                    <Button
                      variant="warning"
                      className="w-100"
                      disabled={campo.stato !== "verde"}
                    >
                      Nuova Partita
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="warning"
                      className="w-100"
                      disabled={campo.stato !== "rosso"}
                      onClick={() => setPartitaInCorso(campo)}
                    >
                      Vedi Partita
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="warning"
                      className="w-100"
                      disabled={campo.stato !== "rosso"}
                      onClick={() => window.open(`/${campo.id}`, "_blank")}
                    >
                      Condividi
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
