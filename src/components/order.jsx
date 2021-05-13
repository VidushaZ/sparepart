/* eslint-disable */
import React, { Component } from "react";
import {Link} from "react-router-dom"
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import axios from "axios";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';

const muteParaStyle = { fontSize: 10};
const paraStyle = { width: 280};

class Order extends Component {

    state = {
       
      orderStatus: '',
      Status: '',
      
 
        
    };
    async componentDidMount() {

       

      


    await axios.get('http://localhost:5000/api/orders/status/' + this.props.order.orderId)
    .then((response) => {
         
      


         
          this.setState({ orderStatus: response.data.status})

          this.setState({Status: this.state.orderStatus })

       })
       .catch((error) => {
         console.log(error);
       });
    

      }

    
    render() {
     
      
        return (
        
           <div> 
                <br/> <br/> <br/>   
           <div  className="card"  style={{width: "25rem"}}>
               
          
 
  <div className="card-body">
  <p class="text-muted" style={muteParaStyle}>status:<span>&nbsp;</span>{this.state.Status}</p>
  <p class="text-muted" style={muteParaStyle}>ORDER ID </p>
        <h5 className="card-title"><p class="text-light bg-dark">{this.props.order.orderId}</p></h5>
       
        <p class="text-white bg-info" style={paraStyle}>Change Order Status </p>

        <Button variant="outline-dark" onClick={() => { {this.props.onUpdateOrderStatusProcessing()}; {this.setState({Status: "Processing"})}}}>Processing</Button> <span>&nbsp;</span>
        <Button variant="outline-dark" onClick={() => { {this.props.onUpdateOrderStatusPreparing()}; {this.setState({Status: "Preparing"})}}}>Preparing</Button> <span>&nbsp;</span>
        <Button variant="outline-dark" onClick={() => { {this.props.onUpdateOrderStatusDelivered()}; {this.setState({Status: "Delivered"})}}}>Delivered</Button> <span>&nbsp;</span>



<br/><br/><Link className="avenger-detail" to={"/Orders/details/"+ this.props.order.orderId}>
    
                       <br/> <button className="btn btn-warning">View Order...</button>
</Link> <span>&nbsp;&nbsp;</span> <Button variant="outline-danger" onClick={this.props.onDeleteOrder}>Finish Order</Button>





       
       
                    
  </div>
</div>
</div>

      

        );
    }
}

export default Order;