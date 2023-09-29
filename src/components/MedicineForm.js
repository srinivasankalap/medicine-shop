
import { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

const AddMedicine = (props) => {
  const [medicineName, setMedicineName] = useState("");
  const [description, setDescription] = useState("");
  const [medicinePrice, setMedicinePrice] = useState("");
  const submitHandler = async(event) => {
    event.preventDefault();
    const medicine = {

      name: medicineName,
      desc: description,
      price: medicinePrice,
    };

    props.onAddMedicine(medicine);
    setMedicineName("");
    setDescription("");
    setMedicinePrice("");
  };
  return (
    <Container
      className="d-flex justify-content-center"
      style={{ marginTop: "15px" }}
    >
      <Form onSubmit={submitHandler}>
        <Row className="mx-0">
          <Col xs={12} sm={3} className="pr-0">
            <Form.Group controlId="productName" className="mb-0">
              <Form.Label>Medicine Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter medicine name"
                value={medicineName}
                required
                onChange={(event) => setMedicineName(event.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={3} className="pr-0">
            <Form.Group controlId="productDescription" className="mb-0">
              <Form.Label>Medicine Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter medicine description"
                value={description}
                required
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={3} className="pr-0">
            <Form.Group controlId="productPrice" className="mb-0">
              <Form.Label>Medicine Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter medicine price"
                value={medicinePrice}
                required
                onChange={(event) => setMedicinePrice(event.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={3} className="d-flex align-items-end">
            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "15px" }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddMedicine;