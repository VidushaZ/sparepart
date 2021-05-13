import React, { Component } from "react";
import axios from 'axios';
import Cart from './carts';




export default class PlaceOrder extends Component {
    

    constructor(props) {
      super(props)
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
  
  
  
     
      
       
    }
  
 
    render() {
      return (
  
        <Cart 
                        
                        onPlaceOrder ={() => this.placeOrder()}

                        />
        
      );
    }
  
    
  async placeOrder(){
  
  
    const orderObject = {
     
      userId: this.state.userId
    };
  
    
  
    let token =localStorage.getItem('login')
    axios.post('http://localhost:5000/api/orders/', orderObject,{
      headers:{
        "token":token
      }
    })
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
  
  