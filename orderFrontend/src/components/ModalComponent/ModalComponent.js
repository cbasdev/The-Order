import React, { Component } from "react";
import "./ModalComponent.scss";
import { Modal, Button } from "react-bootstrap";

// get our fontawesome imports
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ModalComponent extends Component {



  render() {
    const shoppingcart = this.props.shoppingcart;
    var total = 0
    for (const key in this.props.shoppingcart) {
      total += shoppingcart[key].price  
    }
    

    return (
      <Modal
        className="modal"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Lista de Productos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FontAwesomeIcon className="iconCart" icon={faShoppingCart} />

          <table className="table">
            <thead>
              <tr>
                <th scope="col">N°</th>
                <th scope="col">Pedido</th>
                <th scope="col">Descripción</th>
                <th scope="col">Precio</th>
              </tr>
            </thead>
            <tbody>
              {shoppingcart.map((product, i) => {
                return (
                  <tr key={product.id}>
                    <th scope="row">{i + 1}</th>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
            <span className="total">Total: ${total}</span>
          <Button className="btn btn-warning">Realizar Pedido</Button>
          <Button className="btn btn-danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalComponent;
