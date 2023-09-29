import { useContext } from "react";
import { Table, Button, Container } from "react-bootstrap";
import CartContext from "../store/cart-context";
const MedicineList = (props) => {
  const { medicines } = props;
  const cartCtx = useContext(CartContext);
  return (
    <Container className="mx-auto my-4">
      <Table hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={index}>
              <td>{medicine.name}</td>
              <td>{medicine.desc}</td>
              <td>{medicine.price}</td>
              <td>
                <Button
                  variant="success"
                  style={{ marginRight: "15px" }}
                  onClick={() => cartCtx.addItem(medicine, 1)}
                >
                  Add to Cart
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MedicineList;