import React, { Component } from "react";
import "./ClientHome.scss";
import axios from "axios";


// External Components 
import ModalComponent from '../ModalComponent/ModalComponent'

// get our fontawesome imports
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/images/logo.svg";

class ClientHome extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      products: {},
      status: null,
      order: [],
      addModalShow: false
    };
  }


  componentWillMount() {
    this.getProducts();
  }

  getProducts = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1.0/products/?format=json")
      .then((res) => {
        this.setState({
          products: res.data,
          status: "success",
        });
      });
  };

  async addShoppingCart(product){
    console.log("item add", product)
    await this.setState({
      order: this.state.order.concat([product])
    })
    console.log('products in cart: ', this.state.order)
  }

  render() {
    let addModalClose = () => this.setState({addModalShow:false})
    return (
      <div className="ClientHome">
        <ModalComponent 
        show={this.state.addModalShow}
        onHide={addModalClose}
        />
        <div 
        onClick={()=> this.setState({addModalShow: true})}
        className="row header">
          <div className="col-md-10">
            <h3> The Order App </h3>
          </div>
          <div className="col-md-2 orderview">
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
                  <img src={logo} alt="Logo" />
                  <button onClick={() => {
                    this.addShoppingCart(product)
                  }} className="btn btn-light">Agregar Al Pedido</button>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default ClientHome;
