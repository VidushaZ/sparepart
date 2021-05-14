import React, { Component } from "react";
import Order from "./userOrder";
import axios from "axios";



class UserOrders extends Component {

    state = {

        allOrders: [],
        allOrderItems: [],
        allOrderStatus: [],
        userId: '',
        
       
        
       
    };
    render() {
      
       
        
        return (
            <div className="container" > <br/><br/><br/><br/>
              <h3 className="text-center">CUURENT ORDERS</h3><br/><br/>
               
                <div className="row">
            
                    {this.state.allOrders.map((order) => (

                        <div  key={order.orderId} className="col">
                        <Order 
                        key= {order.orderId}
                        order={order}

 
                        />
                         
                    </div>

                    

                    ))}


                    

                </div>
            </div>
            
        );
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





        const {data} = await axios.get(`http://localhost:5000/api/orders/` +this.userId, {
             headers:{
            "token":token
        }
        });
        let orders = data.map((order) => {
            return{
                orderId: order,
            
                
            };
        });
        this.setState({ allOrders: orders});


      



    }

   

        
    }

    

     


    


export default UserOrders; 