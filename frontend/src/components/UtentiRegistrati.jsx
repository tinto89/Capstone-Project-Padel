import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Button, Modal, Form } from "react-bootstrap";

export default function UtentiRegistrati() {
  const [utenti, setUtenti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ nome: "", cognome: "", email: "" });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState(null);

  const API_USERS_URL = process.env.REACT_APP_API_URL + "/users";

  useEffect(() => {
    fetchUtenti();
  }, []);

  const fetchUtenti = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_USERS_URL);

      if (!response.ok) {
        throw new Error("Errore nel recupero utenti");
      }

      const data = await response.json();
      setUtenti(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    setAdding(true);
    setAddError(null);

    try {
      const response = await fetch(API_USERS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Errore nell'aggiunta dell'utente");
      }

      const newUserData = await response.json();
      setUtenti([...utenti, newUserData]);
      setShowModal(false);
      setNewUser({ nome: "", cognome: "", email: "" });
    } catch (error) {
      setAddError(error.message);
    } finally {
      setAdding(false);
    }
  };

  const deleteUser = async (utente) => {
    // Mostra un alert di conferma prima di eliminare
    const isConfirmed = window.confirm(
      `Sei sicuro di voler eliminare l'utente ${utente.nome}${" "}${
        utente.cognome
      }?`
    );

    // Se l'utente conferma, elimina l'utente
    if (isConfirmed) {
      try {
        const response = await fetch(`${API_USERS_URL}/${utente._id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Errore nell'eliminazione dell'utente");
        }
        fetchUtenti();
      } catch (error) {
        setError(error.message);
      }
    } else {
      console.log("Eliminazione annullata");
    }
  };

  return (
    <>
      <h2>👥 Utenti Registrati</h2>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button variant="warning" onClick={() => setShowModal(true)}>
            ➕ Aggiungi Utente
          </Button>
        </div>

        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th></th>
                <th>Nome</th>
                <th>Cognome</th>
                <th>eMail</th>
              </tr>
            </thead>
            <tbody>
              {utenti.map((utente, index) => (
                <tr key={utente.email}>
                  <td>
                    <Button
                      variant="disabled"
                      className="p-0 me-4"
                      onClick={() => deleteUser(utente)}
                    >
                      ❌
                    </Button>
                    {index + 1}
                  </td>
                  <td>{utente.nome}</td>
                  <td>{utente.cognome}</td>
                  <td>{utente.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Aggiungi Nuovo Utente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {addError && <Alert variant="danger">{addError}</Alert>}
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il nome"
                  value={newUser.nome}
                  onChange={(e) =>
                    setNewUser({ ...newUser, nome: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il cognome"
                  value={newUser.cognome}
                  onChange={(e) =>
                    setNewUser({ ...newUser, cognome: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Inserisci l'email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annulla
            </Button>
            <Button variant="warning" onClick={handleAddUser} disabled={adding}>
              {adding ? "Aggiunta in corso..." : "Aggiungi"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
