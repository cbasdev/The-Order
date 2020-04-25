import React, { Component } from "react";
import "./ModalComponent.scss";
import { Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import axios from 'axios'

// get our fontawesome imports
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


toast.configure()


class ModalComponent extends Component {

  name_orderRef = React.createRef()
  observationsRef = React.createRef()
  status_falseRef = React.createRef()
  status_trueRef = React.createRef()
  state = {
    order: {},
  }


  sendOrder = (event) => {
    event.preventDefault()
    var status_place = 1
    if(this.status_trueRef.current.checked){
      status_place = 1
    }else{
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

    axios.post('http://localhost:8000/api/v1.0/order/', order)
      .then(res=>{
        if(res.data.products){
        toast.success('Orden enviada satisfactoriamente!')

          console.log('Orden GENERADA')
        }
        else{
          console.log('Orden Rechazada')
        }
      })

    console.log('Formulario Enviado', order)   
  }




  render() {
    const shoppingcart = this.props.shoppingcart;
    
    var total = 0;
    for (const key in this.props.shoppingcart) {
      total += shoppingcart[key].price;
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
        <form className="mid-form" onSubmit={this.sendOrder}>
          <div className="form-group">
            <label>Nombre del Pedido: </label>
            <input type="text" name="name_order" ref={this.name_orderRef} />
          </div>
          <div className="form-group">
            <label>Observaciones: </label>
            <input type="text" name="observations" ref={this.observationsRef} />
          </div>
          <div className="form-group">
            <input type="radio" name="status_place" value="False" ref={this.status_falseRef} /> Para Llevar
            <input type="radio" name="status_place" value="True " ref={this.status_trueRef} /> Para
            Consumir Aqui
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
            Close
          </Button>
        </Modal.Footer>
        </form>

      </Modal>
    );
  }
}

export default ModalComponent;
