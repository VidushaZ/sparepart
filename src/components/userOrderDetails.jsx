import React, { Component } from "react";
import axios from 'axios';
import {decode as base64_decode, encode as base64_encode} from 'base-64'
import OrderItems from "./orderItems";






export default class OrderDetail extends Component {



  constructor(props) {
    super(props)

    
   
    // State
    this.state = {
      allOrderItems: [],
      orderStatus: '',
      totalAmount: 0,
      noItems: 0,
      userId:''

      
    }
  }

 async componentDidMount() {


  



  var sum = 0
  var noOfItems = 0
   
  
   const {data} = await axios.get('http://localhost:5000/api/orders/user/' + this.props.match.params.id)
        let products = data.map((product) => {
          sum += product.price
          noOfItems += 1
          this.setState({ totalAmount: sum })
          this.setState({ noItems: noOfItems })
            return{
                id: product._id,
                imgUrl:product.imgUrl,
                name: product.name,
                description: product.description,
                price: product.price,
                status: product.status,
                
            };

           

        });
        this.setState({ allOrderItems: products});


        await axios.get('http://localhost:5000/api/orders/status/' + this.props.match.params.id)
         .then((response) => {
              
           


              
               this.setState({ orderStatus: response.data.status})

            })
            .catch((error) => {
              console.log(error);
            });

        
    


  }




 

  render() {
      
       
        
        return (
            <div className="container" > <br/><br/><br/><br/>

<h4 className="text-center" >Order Details</h4>
<br/><br/><br/><br/>
            
        <p  class="text-black bg-light" >ORDER STATUS   <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> TOTAL AMOUNT  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> NO OF ITEMS</p>
        <p class="text-white bg-primary" >{this.state.orderStatus}  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Rs. {this.state.totalAmount} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{this.state.noItems}</p>
        
        <br/><br/>
                <div className="row">
            

                      {this.state.allOrderItems.map((orderItems) => (

                        <div  key={orderItems.orderId} className="col">
                        <OrderItems 
                        key= {orderItems.orderId}
                        order={orderItems}
                                          
                        />
                         
                    </div>

                    ))}

                </div><br/><br/>
                
            </div>
            
        );
    }


    
}
