import React, { useEffect, useState } from "react";
import "../App.css";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import ChoosedGame from "./ChoosedGame";

export default function CampiGestiti({ partitaInCorso, setPartitaInCorso }) {
  const API_FIELDS_URL = "http://localhost:3001/api/fields";
  const [show, setShow] = useState(false);
  const [campoSelezionato, setCampoSelezionato] = useState(null); // Stato per il campo selezionato
  const [userA1, setUserA1] = useState(""); // Stato per il nome Giocatore A1
  const [userA2, setUserA2] = useState(""); // Stato per il nome Giocatore A2
  const [userB1, setUserB1] = useState(""); // Stato per il nome Giocatore B1
  const [userB2, setUserB2] = useState(""); // Stato per il nome Giocatore B2
  const handleClose = () => setShow(false);
  const handleShow = (campo) => {
    setCampoSelezionato(campo); // Imposta il campo selezionato
    setUserA1(""); // Reset dei valori precedenti
    setUserA2("");
    setUserB1("");
    setUserB2("");
    setShow(true); // Mostra il modal
  };
  const [campi, setCampi] = useState([]);

  const getFields = async () => {
    try {
      const response = await fetch(API_FIELDS_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Errore nel recuperare i campi");
      }
      const data = await response.json();
      setCampi(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFields();
  }, [partitaInCorso]);

  // Se è attiva una partita, mostra il componente ChoosedGame
  if (partitaInCorso) {
    return (
      <ChoosedGame
        campo={partitaInCorso}
        setPartitaInCorso={setPartitaInCorso}
        getFields={getFields}
      />
    );
  }

  // Funzione per inviare i dati e aggiornare il campo
  const handleSubmit = async () => {
    if (campoSelezionato) {
      const updatedCampo = {
        ...campoSelezionato,
        userA1,
        userA2,
        userB1,
        userB2,
        stato: "rosso", // Modifica stato a "rosso"
      };

      try {
        const response = await fetch(
          `${API_FIELDS_URL}/${campoSelezionato._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCampo), // Invia i dati aggiornati
          }
        );

        if (!response.ok) {
          throw new Error("Errore nell'aggiornare il campo");
        }

        const data = await response.json();
        // Aggiorna la lista dei campi
        setCampi((prevCampi) =>
          prevCampi.map((campo) => (campo._id === data._id ? data : campo))
        );

        setPartitaInCorso(updatedCampo); // Imposta la partita in corso
        handleClose(); // Chiudi il modal
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuova Partita</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <label>A1</label>
          <input
            name="A1"
            value={userA1}
            onChange={(e) => setUserA1(e.target.value)} // Gestisci il cambiamento di valore
            type="text"
            placeholder="Nome Giocatore A1"
          />

          <label>A2</label>
          <input
            name="A2"
            value={userA2}
            onChange={(e) => setUserA2(e.target.value)} // Gestisci il cambiamento di valore
            type="text"
            placeholder="Nome Giocatore A2"
          />

          <label>B1</label>
          <input
            name="B1"
            value={userB1}
            onChange={(e) => setUserB1(e.target.value)} // Gestisci il cambiamento di valore
            type="text"
            placeholder="Nome Giocatore B1"
          />

          <label>B2</label>
          <input
            name="B2"
            value={userB2}
            onChange={(e) => setUserB2(e.target.value)} // Gestisci il cambiamento di valore
            type="text"
            placeholder="Nome Giocatore B2"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="warning"
            onClick={handleSubmit} // Gestisci il submit
          >
            Avvia
          </Button>
        </Modal.Footer>
      </Modal>

      <h2>Campi Gestiti</h2>
      <Row className="w-100 d-flex justify-content-center mt-4">
        {campi.map((campo) => (
          <Col md={5} className="mb-4" key={campo._id}>
            <Card className="p-3 shadow-sm clickable-card">
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
                      onClick={() => handleShow(campo)} // Passa il campo selezionato al modal
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
                      onClick={() => window.open(`/${campo._id}`, "_blank")}
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
