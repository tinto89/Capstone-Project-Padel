import React, { useEffect } from "react";
import { SignedOut, SignIn, useUser } from "@clerk/clerk-react";
import { Container, Row, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user.publicMetadata.database) {
      navigate("/dashboard");
    } else {
      alert(
        "Account non presente nel database, chiedi all'admin di registrarlo"
      );
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column align-items-center justify-content-center background-image"
    >
      <h1 className="fw-bold my-4">L'app per il tuo centro padel</h1>
      <Image src="/icon_logo.ico" className="app-logo" alt="logo" />

      <Row className="mt-4">
        <SignedOut>
          <SignIn />
        </SignedOut>
      </Row>
    </Container>
  );
}
