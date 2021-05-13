/* eslint-disable */
import React, { Component } from "react";
import {Link} from "react-router-dom"
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import axios from "axios";



class OrderItems extends Component {

    state = {
       
     
        
    };
    

  
    



    
    render() {
     
      
        return (
        
           <div>
            
            
          
           <div  className="card"  style={{width: "18rem"}}>
               
      
  <img src={this.props.order.imgUrl} width="100" height="200" className="card-img-top" alt="..."/>
  <div className="card-body">
        <h5 className="card-title"><p class="text-light bg-dark">{this.props.order.name}</p></h5>
       
    <p className="card-text">RS. {this.props.order.price}</p>
   



<br/>
<br/>



       
       
                    
  </div>
</div>
</div>

      

        );
    }
}

export default OrderItems;