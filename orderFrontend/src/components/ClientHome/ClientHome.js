import React, { Component } from 'react';
import './ClientHome.scss';
import axios from 'axios'

// get our fontawesome imports
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/images/logo.svg"

class ClientHome extends Component {
  state = {
    products: {},
    status: null
  }

  componentWillMount(){
    this.getProducts()
  }

  getProducts  = () => {
    axios.get('http://127.0.0.1:8000/api/v1.0/products/?format=json')
      .then(res =>{
          this.setState({
            products: res.data,
            status: 'success'
          })
        })
  }

  render () {

    
    return (
  <div className="ClientHome">
    <div className="row header">
      <div className="">
        <h3> The Order App </h3>
      </div>
      <div className="">
         <FontAwesomeIcon icon={faShoppingCart} />
      </div>
    </div>
    <div className="row products justify-content-center">

        {this.state.status === 'success' &&
          this.state.products.map((product, i) => {
            return(
             <div key={product.id} className="card col-md-3 col-ss-2">
               <h4>{product.title}</h4>
               <p>{product.description}</p>
               <img src={logo} alt="Logo"/>
               <button className="btn btn-light">Agregar Al Pedido</button>
             </div> 
            )
          })
        }
    </div>
  </div>
    );
  }
}



export default ClientHome;
