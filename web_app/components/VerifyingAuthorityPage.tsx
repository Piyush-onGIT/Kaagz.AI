import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./VerifyingAuthorityPage.module.css";

const VerifyingAuthorityPage: React.FC = () => {
  const verifiedDocuments = [
    {
      id: 1,
      documentName: "Birth Certificate",
      verifiedOn: "2024-01-15",
      status: "Verified",
    },
    {
      id: 2,
      documentName: "Academic Transcript",
      verifiedOn: "2024-01-10",
      status: "Verified",
    },
  ];

  return (
    <div>
      <Container className={styles.page}>
        <Row className="mt-5">
          <Col className="text-center">
            <Button href="/va/scan" className={styles.proceedButton}>
              Proceed to Verification
            </Button>
          </Col>
        </Row>
        <Row>
          <h2 className={styles.sectionTitle}>Previously Verified Documents</h2>
          {verifiedDocuments.length > 0 ? (
            <div className={styles.documentContainer}>
              {verifiedDocuments.map((doc) => (
                <div key={doc.id} className={styles.documentCard}>
                  <div className={styles.curve}></div>
                  <h3 className={styles.documentTitle}>{doc.documentName}</h3>
                  <p className={styles.documentDate}>
                    Verified On: {doc.verifiedOn}
                  </p>
                  <span className={styles.status}>{doc.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No documents verified yet.</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default VerifyingAuthorityPage;
