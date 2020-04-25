import React, { Component } from "react"
import "./ClientHome.scss"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// External Components
import ModalComponent from "../ModalComponent/ModalComponent"

// get our fontawesome imports
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

toast.configure()

class ClientHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: {},
      status: null,
      order: [],
      addModalShow: false,
    }
  }

  // This method is executed will mounting the component
  componentWillMount() {
    this.getProducts()
  }

  // Arrow function to send get request to products of API
  getProducts = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1.0/products/?format=json")
      .then((res) => {
        this.setState({
          products: res.data,
          status: "success",
        })
      })
  }

  // Async function to set new product in a cart
  async addShoppingCart(product) {
    await this.setState({
      order: this.state.order.concat([product]),
    })
  }

  // Show alert in browser with module toast
  notify = () => {
    toast.success("Producto añadido al pedido!")
  }

  render() {
    let addModalClose = () => this.setState({ addModalShow: false })
    return (
      <div className="ClientHome">
        <ModalComponent
          show={this.state.addModalShow}
          onHide={addModalClose}
          shoppingcart={this.state.order}
        />

        <div className="row header">
          <div className="col-md-10">
            <h3> The Order App </h3>
          </div>
          <div
            onClick={() => this.setState({ addModalShow: true })}
            className="col-md-2 orderview"
          >
            <span>Ver Pedido</span>
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
        </div>

        <div className="row products justify-content-center">
          {this.state.status === "success" &&
            this.state.products.map((product, i) => {
              return (
                <div key={product.id} className="card col-md-3 col-ss-2">
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                  <div className="image-product">
                    <img src={product.image} alt="Logo" />
                  </div>
                  <button
                    onClick={() => {
                      this.addShoppingCart(product)
                      this.notify()
                    }}
                    className="btn btn-warning"
                  >
                    Agregar Al Pedido
                  </button>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

export default ClientHome
