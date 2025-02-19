import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "../App.css";

export default function SharingField() {
  const { id } = useParams();
  const [campo, setCampo] = useState([]);

  const API_FIELDS_URL = process.env.REACT_APP_API_FIELDS_URL;

  // Funzione per fetch dei dati del campo
  const fetchCampo = async () => {
    try {
      const response = await fetch(`${API_FIELDS_URL}/${id}`);
      if (!response.ok) throw new Error("Errore nel recuperare il campo");
      const data = await response.json();
      setCampo(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCampo();

    // Imposta un intervallo per fetch ogni 5 secondi
    const intervalId = setInterval(fetchCampo, 5000);

    // Pulizia dell'intervallo quando il componente viene smontato
    return () => clearInterval(intervalId);
  }, []);

  // Verifica se i dati del campo sono stati caricati
  if (!campo) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 background-image ">
      <div className="text-center match-container w-75">
        <h1>{campo.nome} - Partita in corso</h1>
        <div className="p-4">
          <Row>
            <Col>
              <h1 className="mb-4 text-danger">Team A</h1>
              <h2>{campo.userA1}</h2>
              <h2 className="mb-4">{campo.userA2}</h2>
              <h1 className="p-3">
                {campo.advantage === "A" ? "AD" : campo.scoreA}
              </h1>
              <h2 className="mt-4 ">Set: {campo.setsA}</h2>
              <h2>Games: {campo.gamesA}</h2>
            </Col>
            <Col>
              <h1 className="mb-4 text-warning">Team B</h1>
              <h2>{campo.userB1}</h2>
              <h2 className="mb-4">{campo.userB2}</h2>
              <h1 className="p-3">
                {campo.advantage === "B" ? "AD" : campo.scoreB}
              </h1>
              <h2 className="mt-4">Set: {campo.setsB}</h2>
              <h2>Games: {campo.gamesB}</h2>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
