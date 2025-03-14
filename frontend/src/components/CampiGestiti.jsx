import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Modal, Spinner, Alert } from "react-bootstrap";
import ChoosedGame from "./ChoosedGame";
import "../App.css";

export default function CampiGestiti({ partitaInCorso, setPartitaInCorso }) {
  const [show, setShow] = useState(false);
  const [campoSelezionato, setCampoSelezionato] = useState(null);
  const [users, setUsers] = useState([]);
  const [userA1, setUserA1] = useState("");
  const [userA2, setUserA2] = useState("");
  const [userB1, setUserB1] = useState("");
  const [userB2, setUserB2] = useState("");
  const [campi, setCampi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_FIELDS_URL = process.env.REACT_APP_API_URL + "/fields";
  const API_USERS_URL = process.env.REACT_APP_API_URL + "/users";

  // Fetch dei campi disponibili
  const getFields = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_FIELDS_URL);
      if (!response.ok) throw new Error("Errore nel recuperare i campi");
      const data = await response.json();
      setCampi(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch degli utenti registrati
  const getUsers = async () => {
    try {
      const response = await fetch(API_USERS_URL);
      if (!response.ok) throw new Error("Errore nel recuperare gli utenti");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFields();
    getUsers();
  }, [partitaInCorso]);

  const handleShow = (campo) => {
    setCampoSelezionato(campo);
    setUserA1("");
    setUserA2("");
    setUserB1("");
    setUserB2("");
    setShow(true);
  };

  const handleClose = () => setShow(false);

  // Avvia la partita aggiornando il campo
  const handleSubmit = async () => {
    if (campoSelezionato) {
      const updatedCampo = {
        ...campoSelezionato,
        userA1,
        userA2,
        userB1,
        userB2,
        stato: "rosso", // Imposta il campo come "occupato"
      };

      try {
        const response = await fetch(
          `${API_FIELDS_URL}/${campoSelezionato._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCampo),
          }
        );

        if (!response.ok) throw new Error("Errore nell'aggiornare il campo");

        const data = await response.json();
        setCampi((prevCampi) =>
          prevCampi.map((campo) => (campo._id === data._id ? data : campo))
        );

        setPartitaInCorso(updatedCampo);
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Se è attiva una partita, mostra il componente ChoosedGame
  if (partitaInCorso) {
    return (
      <ChoosedGame
        campo={partitaInCorso}
        apiFieldsUrl={API_FIELDS_URL}
        setPartitaInCorso={setPartitaInCorso}
        getFields={getFields}
      />
    );
  }

  return (
    <>
      {/* Modal per selezionare i giocatori */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuova Partita</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <label>A1</label>
          <select value={userA1} onChange={(e) => setUserA1(e.target.value)}>
            <option value="">Seleziona Giocatore A1</option>
            {users.map((user) => (
              <option key={user._id} value={user.nome}>
                {user.nome} {user.cognome}
              </option>
            ))}
          </select>

          <label>A2</label>
          <select value={userA2} onChange={(e) => setUserA2(e.target.value)}>
            <option value="">Seleziona Giocatore A2</option>
            {users.map((user) => (
              <option key={user._id} value={user.nome}>
                {user.nome} {user.cognome}
              </option>
            ))}
          </select>

          <label>B1</label>
          <select value={userB1} onChange={(e) => setUserB1(e.target.value)}>
            <option value="">Seleziona Giocatore B1</option>
            {users.map((user) => (
              <option key={user._id} value={user.nome}>
                {user.nome} {user.cognome}
              </option>
            ))}
          </select>

          <label>B2</label>
          <select value={userB2} onChange={(e) => setUserB2(e.target.value)}>
            <option value="">Seleziona Giocatore B2</option>
            {users.map((user) => (
              <option key={user._id} value={user.nome}>
                {user.nome} {user.cognome}
              </option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleSubmit}>
            Avvia
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Lista Campi */}
      <h2>Campi Gestiti</h2>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
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
                        onClick={() => handleShow(campo)}
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
      )}
    </>
  );
}
