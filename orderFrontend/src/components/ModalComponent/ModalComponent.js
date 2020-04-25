import React, { Component } from "react"
import "./ModalComponent.scss"

//Bootstrap
import { Modal, Button } from "react-bootstrap"

// Toast
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import axios from "axios"

// Get our fontawesome imports
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// Simple Forms Validators
import SimpleReactValidator from "simple-react-validator"

toast.configure()

class ModalComponent extends Component {
  name_orderRef = React.createRef()
  observationsRef = React.createRef()
  status_falseRef = React.createRef()
  status_trueRef = React.createRef()
  state = {
    order: {},
  }

  componentWillMount() {
    this.validator = new SimpleReactValidator()
  }
  sendOrder = (event) => {
    event.preventDefault()
    var status_place = 1
    if (this.status_trueRef.current.checked) {
      status_place = 1
    } else {
      status_place = 0
    }

    //calculate total
    var total = 0
    var id_products = []
    for (const key in this.props.shoppingcart) {
      total += this.props.shoppingcart[key].price
      id_products.push(this.props.shoppingcart[key].id)
    }

    var order = {
      name_order: this.name_orderRef.current.value,
      total_price: total,
      observations: this.observationsRef.current.value,
      status_place: status_place,
      state: 0,
      products: id_products,
    }

    //post
    if (
      order.name_order !== "" &&
      order.total_price !== 0 &&
      order.observations !== "" &&
      order.status_place !== ""
    ) {
      axios.post("http://localhost:8000/api/v1.0/order/", order).then((res) => {
        if (res.data.products) {
          toast.success("Orden enviada satisfactoriamente!")
        } else {
          toast.dismiss("No se pudo realizar la Orden!")
        }
      })
    } else {
      toast.error("No se pudo realizar la Orden!")
    }
  }

  render() {
    const shoppingcart = this.props.shoppingcart

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
                )
              })}
            </tbody>
          </table>
        </Modal.Body>
        <form className="md-form" onSubmit={this.sendOrder}>
          <div className="form-group name_order md-form">
            <input
              className="text-input"
              type="text"
              name="name_order"
              ref={this.name_orderRef}
              placeholder="Nombre de la Orden"
            />

            {this.validator.message(
              "name_order",
              this.state.order.name_order,
              "required"
            )}
          </div>

          <div className="form-group observations">
            <input
              className="text-input"
              type="text"
              name="observations"
              ref={this.observationsRef}
              placeholder="Observaciones"
            />
          </div>

          <div className="form-group radiobuttons">
            <input
              className="radio- 2"
              type="radio"
              name="status_place"
              value="False"
              ref={this.status_falseRef}
            />
            <span>Para Llevar</span>
            <input
              className="radio radio-rigth"
              type="radio"
              name="status_place"
              value="True "
              ref={this.status_trueRef}
            />
            <span>Para Consumir Aqui</span>
          </div>

          <Modal.Footer>
            <span className="total">Total: ${total}</span>
            <input
              type="submit"
              value="Realizar Pedido"
              className="btn btn-warning"
              onClick={this.props.onHide}
            />
            <Button className="btn btn-danger" onClick={this.props.onHide}>
              Cerrar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}

export default ModalComponent
