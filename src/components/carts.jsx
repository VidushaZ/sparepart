/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import StudentTableRow from './cartTableRow';
import {decode as base64_decode, encode as base64_encode} from 'base-64'



export default class Cart extends Component {
    

  constructor(props) {
    super(props)
    this.placeOrder = this.placeOrder.bind(this);
    this.state = {
      CartItems: [],
      userId:"",

    };
  }

  

 
 async componentDidMount() {
   
 

   
    let token =localStorage.getItem('login')

    await axios.post('http://localhost:5000/api/auth/get/userId',token,{
       
        headers:{
          'token':token
        }
      })
    .then((res) => {

     if(res.data){

      this.userId =(res.data);

     

     }

     else{
        console.log("Error while authorization please Log in again.")
      }
      
      
    }).catch((error) => {
      console.log('Error while authorization please Log in again.')
      console.log(error)
    })



    const cartFilterObject = {

        userId:this.userId
        
          
    }



    const{data} =await axios.post('http://localhost:5000/api/carts/myCart',cartFilterObject)
    let newCartItems=data.map((cartItem) => {
      return{
        id: cartItem._id,
        imgUrl: cartItem.imgUrl,
        category: cartItem.category,
        price: cartItem.price,
        name: cartItem.name,
        description: cartItem.description
      };
    });
    this.setState({ CartItems: newCartItems});
    
     
  }





  DataTable() {
    return this.state.CartItems.map((cartItem) => {
      return  <StudentTableRow avenger={cartItem} onDelete={() => this.deleteCartItem(cartItem.id)} />
    });
  }


  


  render() {
    return (

      <div className="container" >
     
      <div className="row">
        

    
    <div className="striped bordered hover"><br/><br/><br/>
     
<h3 className="text-center">Welcome to cart</h3><br/>

<p class="text-white bg-dark"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>IMAGE  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> NAME  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>DESCRIPTION <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> NAME  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>PRICE</p>
      <Table striped bordered hover>

  
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <Button onClick={this.placeOrder}> Place Order</Button>
   <br/><br/><br/> </div>
              
    </div>
  </div>);
  }

  async deleteCartItem(id) {
    
    axios.delete(`http://localhost:5000/api/carts/${id}`)
        .then((res) => {
            console.log('Cart Item successfully deleted!')
            let updatedCartItems = this.state.CartItems.filter(
                (cartItem) => cartItem.id !== id,
    
            );
            this.setState({CartItems: updatedCartItems});
        }).catch((error) => {
            console.log(error)
        })

        
        
}
async placeOrder(){


  const orderObject = {
   
    userId: "60943c1eb6825263a0b7fea0"
  };

  
 await axios.post('http://localhost:5000/api/orders', orderObject)
    .then((res) => {
      console.log(res.data)
      console.log('Order Placed successfully.')
          // Redirect to Student List 
          this.props.history.push('/products')
    }).catch((error) => {
      console.log(error)
    })
  
}

}

