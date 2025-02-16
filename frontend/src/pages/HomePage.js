import React, { useState } from "react";
import "../App.css";
import { Container, Col, Row, Button, Image, Navbar } from "react-bootstrap";
import Dashboard from "../components/Dashboard";
import CampiGestiti from "../components/CampiGestiti";
import UtentiRegistrati from "../components/UtentiRegistrati";
import { UserButton } from "@clerk/clerk-react";

export default function HomePage({ partitaInCorso, setPartitaInCorso }) {
  const [activePage, setActivePage] = useState("dashboard");

  // Funzione per cambiare la pagina
  const changePage = (page) => {
    setPartitaInCorso(null);
    setActivePage(page);
  };

  // Mappa per selezionare il componente giusto
  const pages = {
    dashboard: <Dashboard changePage={changePage} />,
    campiGestiti: (
      <CampiGestiti
        partitaInCorso={partitaInCorso}
        setPartitaInCorso={setPartitaInCorso}
      />
    ),
    utentiRegistrati: <UtentiRegistrati />,
  };

  return (
    <Row className="vh-100 m-0">
      {/* Sidebar */}
      <Col
        xs={2}
        className="vh-100 bg-dark text-light p-3 d-flex flex-column align-items-start"
      >
        <Image src="/icon_logo.ico" alt="Logo" className="app-logo-mini mb-4" />
        <Button
          className="nav-link text-light"
          onClick={() => changePage("dashboard")}
        >
          Dashboard
        </Button>
        <Button
          className="nav-link text-light"
          onClick={() => changePage("campiGestiti")}
        >
          Campi Gestiti
        </Button>
        <Button
          className="nav-link text-light"
          onClick={() => changePage("utentiRegistrati")}
        >
          Utenti Registrati
        </Button>
      </Col>

      {/* Navbar e Contenuto */}
      <Col xs={10} className="d-flex flex-column p-0 background-image">
        <Navbar
          bg="dark"
          variant="dark"
          className="w-100 justify-content-end px-3"
        >
          <Navbar.Brand className="text-light">
            Account: Padel Verona
          </Navbar.Brand>
          <UserButton afterSignOutRedirectUrl="/" />
        </Navbar>

        <Container
          fluid
          className="d-flex flex-column align-items-center p-4 overflow-auto"
        >
          {/* Mostriamo il componente richiesto */}
          {activePage === "dashboard" ? pages.dashboard : pages[activePage]}
        </Container>
      </Col>
    </Row>
  );
}
